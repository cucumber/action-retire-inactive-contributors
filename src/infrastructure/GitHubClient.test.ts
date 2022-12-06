import { getOctokit } from '@actions/github'
import {
  assertThat,
  equalTo,
  falsey,
  hasItem,
  hasProperty,
  is,
  not,
  promiseThat,
  rejected,
} from 'hamjest'
import { Duration } from '../Duration'
import { Today } from '../Today'
import { GitHubClient } from './GitHubClient'
import { NullOctokitConfig } from './NullOctokitConfig'

const org = 'test-inactive-contributor-action'

const testContributorsTeam = 'test-Contributors'
const testAlumniTeam = 'test-Alumni'
const testUser = 'blaisep'

describe(GitHubClient.name, () => {
  context('adding someone to a team', () => {
    beforeEach(async () => {
      const octokit = getOctokit(token())
      const gitHubClient = new GitHubClient(octokit, org)

      const initialMembers = await gitHubClient.getMembersOf(testAlumniTeam)
      for (const member of initialMembers) {
        await octokit.rest.teams.removeMembershipForUserInOrg({
          org,
          team_slug: testAlumniTeam,
          username: member,
        })
      }
    })

    it('adds a new member to a team', async () => {
      const gitHubClient = client()

      await gitHubClient.addUserToTeam(testUser, testAlumniTeam)
      const members = await gitHubClient.getMembersOf(testAlumniTeam)
      assertThat(members, hasItem(testUser))
    })

    it('says which members have been added to teams', async () => {
      const gitHubClient = client()
      const changes = gitHubClient.trackChanges().data
      assertThat(changes, equalTo([]))

      await gitHubClient.addUserToTeam(testUser, testAlumniTeam)
      assertThat(
        changes,
        equalTo([
          {
            action: 'add',
            user: testUser,
            team: testAlumniTeam,
          },
        ])
      )
    })
  })

  context('removing someone from the team', () => {
    it('removes an existing member from a team', async () => {
      // Given
      const gitHubClient = client()
      await gitHubClient.addUserToTeam(testUser, testContributorsTeam)
      const initialMembers = await gitHubClient.getMembersOf(
        testContributorsTeam
      )
      assertThat(initialMembers, hasItem(testUser))

      // When
      await gitHubClient.removeUserFromTeam(testUser, testContributorsTeam)

      // Then
      const members = await gitHubClient.getMembersOf(testContributorsTeam)
      assertThat(members, not(hasItem(testUser)))
    })

    it('says which members have been removed from teams', async () => {
      const gitHubClient = client()
      await gitHubClient.addUserToTeam(testUser, testContributorsTeam)
      const initialMembers = await gitHubClient.getMembersOf(
        testContributorsTeam
      )
      assertThat(initialMembers, hasItem(testUser))

      // When
      const changes = gitHubClient.trackChanges().data
      await gitHubClient.removeUserFromTeam(testUser, testContributorsTeam)

      // Then
      assertThat(
        changes,
        equalTo([
          { action: 'remove', user: testUser, team: testContributorsTeam },
        ])
      )
    })
  })

  context('working out if a user has committed recently', () => {
    it('returns false if they have not', async () => {
      const gitHubClient = client()
      const hasCommitted = await gitHubClient.hasCommittedSince(
        'olleolleolle',
        new Date()
      )
      assertThat(hasCommitted, is(falsey()))
    })

    it('returns true if they have', async () => {
      const gitHubClient = client()
      const dateOnWhichMattCommitted = new Date(2022, 3, 1) // April 1.
      const hasCommitted = await gitHubClient.hasCommittedSince(
        'mattwynne',
        dateOnWhichMattCommitted
      )
      assertThat(hasCommitted, is(true))
    })
  })

  context('team members', () => {
    it('gets members of a team', async () => {
      const gitHubClient = client()
      const members = await gitHubClient.getMembersOf('fishcakes')
      assertThat(members, equalTo([testUser, 'funficient']))
    })
  })

  context('null instance', () => {
    it('does not actually add user to team', async () => {
      await assertAsynchronous(async () => {
        const gitHubClient = GitHubClient.createNull()
        await gitHubClient.addUserToTeam(testUser, testAlumniTeam)
      })
    })

    it('does not actually remove user from team', async () => {
      await assertAsynchronous(async () => {
        const gitHubClient = GitHubClient.createNull()
        await gitHubClient.removeUserFromTeam(testUser, testAlumniTeam)
      })
    })

    it('by default, teams have no members', async () => {
      await assertAsynchronous(async () => {
        const gitHubClient = GitHubClient.createNull()
        assertThat(
          await gitHubClient.getMembersOf(testContributorsTeam),
          equalTo([])
        )
      })
    })

    it('users with no configured commits throw an exception', async () => {
      const gitHubClient = GitHubClient.createNull()
      await promiseThat(
        gitHubClient.hasCommittedSince(testUser, new Date()),
        rejected(
          hasProperty(
            'message',
            `Attempted to discover commits for null user '${testUser}', but it wasn't configured`
          )
        )
      )
    })

    it('allows team members to be configured', async () => {
      await assertAsynchronous(async () => {
        const config = new NullOctokitConfig({
          team1: ['user1', 'user2'],
          team2: ['user3', 'user4'],
        })

        const gitHubClient = GitHubClient.createNull(config)

        assertThat(
          await gitHubClient.getMembersOf('team1'),
          equalTo(['user1', 'user2'])
        )
        assertThat(
          await gitHubClient.getMembersOf('team2'),
          equalTo(['user3', 'user4'])
        )
        assertThat(await gitHubClient.getMembersOf('noSuchTeam'), equalTo([]))
      })
    })

    it('allows last commit date to be configured per user', async () => {
      await assertAsynchronous(async () => {
        const nineDaysAgo = Today.minus(Duration.of(9).days())
        const tenDaysAgo = Today.minus(Duration.of(10).days())
        const elevenDaysAgo = Today.minus(Duration.of(11).days())

        const config = new NullOctokitConfig(
          {},
          {
            user1: elevenDaysAgo,
            user2: tenDaysAgo,
            user3: nineDaysAgo,
          }
        )
        const gitHubClient = GitHubClient.createNull(config)

        const cutOffDate = tenDaysAgo
        assertThat(
          await gitHubClient.hasCommittedSince('user1', cutOffDate),
          equalTo(false)
        )
        assertThat(
          await gitHubClient.hasCommittedSince('user2', cutOffDate),
          equalTo(true)
        )
        assertThat(
          await gitHubClient.hasCommittedSince('user3', cutOffDate),
          equalTo(true)
        )
      })
    })
  })
})

function token() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error(
      'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    )
  }
  return token
}

function client() {
  const octokit = getOctokit(token())
  return new GitHubClient(octokit, org)
}

async function assertAsynchronous(fn: () => Promise<void>) {
  let tickElapsed = false
  setImmediate(() => (tickElapsed = true))

  await fn()
  assertThat(tickElapsed, equalTo(true))
}
