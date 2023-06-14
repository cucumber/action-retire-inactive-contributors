import { getOctokit } from '@actions/github'
import {
  allOf,
  assertThat,
  equalTo,
  falsey,
  hasItem,
  hasProperty,
  instanceOf,
  is,
  not,
  promiseThat,
  rejected,
} from 'hamjest'
import { UnableToGetMembersError } from './Errors'
import { OctokitGitHub } from './OctokitGitHub'

// This really exists on GitHub
const org = 'test-inactive-contributor-action'

describe(OctokitGitHub.name, () => {
  context('adding someone to a team', () => {
    it('adds a new member to a team', async () => {
      // Given
      const octokit = getOctokit(token())
      const gitHubClient = new OctokitGitHub(octokit, org)
      const teamSlug = 'test-Alumni'
      const initialMembers = await gitHubClient.getMembersOf(teamSlug)
      for (const member of initialMembers) {
        // When
        await octokit.rest.teams.removeMembershipForUserInOrg({
          org,
          team_slug: teamSlug,
          username: member,
        })
      }
      await gitHubClient.addUserToTeam('blaisep', teamSlug)
      const members = await gitHubClient.getMembersOf(teamSlug)

      // Then
      assertThat(members, hasItem('blaisep'))
    })
  })

  context('removing someone from the team', () => {
    it('removes an existing member from a team', async () => {
      // Given
      const gitHubClient = client()
      const teamSlug = 'test-Contributors'
      await gitHubClient.addUserToTeam('blaisep', teamSlug)
      const initialMembers = await gitHubClient.getMembersOf(teamSlug)
      assertThat(initialMembers, hasItem('blaisep'))

      // When
      await gitHubClient.removeUserFromTeam('blaisep', teamSlug)

      // Then
      const members = await gitHubClient.getMembersOf(teamSlug)
      assertThat(members, not(hasItem('blaisep')))
    })
  })

  context('working out if a user has committed recently', () => {
    it('returns false if they have not', async () => {
      // Given
      const gitHubClient = client()

      // When
      const hasCommitted = await gitHubClient.hasCommittedSince(
        'olleolleolle',
        new Date()
      )

      // Then
      assertThat(hasCommitted, is(falsey()))
    })

    it('returns true if they have', async () => {
      // Given
      const gitHubClient = client()
      const dateOnWhichMattCommitted = new Date(2022, 3, 1) // April 1.
      const hasCommitted = await gitHubClient.hasCommittedSince(
        // When
        'mattwynne',
        dateOnWhichMattCommitted
      )

      // Then
      assertThat(hasCommitted, is(true))
    })
  })

  it('gets members of a team', async () => {
    // Given
    const gitHubClient = client()

    // When
    const members = await gitHubClient.getMembersOf('fishcakes')

    // Then
    assertThat(members, equalTo(['blaisep', 'funficient']))
  })

  it('throws a useful error when trying to get members of a non-existent org', async () => {
    // Given
    const org = 'non-existent-org'
    const octokit = getOctokit(token())
    const gitHubClient = new OctokitGitHub(octokit, org)

    // When
    await promiseThat(
      gitHubClient.getMembersOf('fishcakes'),
      rejected(
        allOf(
          instanceOf(UnableToGetMembersError),

          // Then
          hasProperty(
            'message',
            'Not Found, unable to get members of fishcakes from: https://api.github.com/orgs/non-existent-org/teams/fishcakes/members'
          )
        )
      )
    )
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
  return new OctokitGitHub(octokit, org)
}
