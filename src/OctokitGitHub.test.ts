import { OctokitGitHub } from './OctokitGitHub'
import { getOctokit } from '@actions/github'
import { assertThat, equalTo, falsey, hasItem, is, not } from 'hamjest'
import {deepStrictEqual} from "assert";

const org = 'test-inactive-contributor-action'

const testAlumniTeam = 'test-Alumni'
const testUser = 'blaisep';

describe(OctokitGitHub.name, () => {
  context('adding someone to a team', () => {

    beforeEach(async () => {
      const octokit = getOctokit(token())
      const gitHubClient = new OctokitGitHub(octokit, org)

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
      assertThat(changes, equalTo([{
        action: "add",
        user: testUser,
        team: testAlumniTeam,
      }]))
    })

  })

  context('removing someone from the team', () => {
    it('removes an existing member from a team', async () => {
      // Given
      const gitHubClient = client()
      const teamSlug = 'test-Contributors'
      await gitHubClient.addUserToTeam(testUser, teamSlug)
      const initialMembers = await gitHubClient.getMembersOf(teamSlug)
      assertThat(initialMembers, hasItem(testUser))

      // When
      await gitHubClient.removeUserFromTeam(testUser, teamSlug)

      // Then
      const members = await gitHubClient.getMembersOf(teamSlug)
      assertThat(members, not(hasItem(testUser)))
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

  it('gets members of a team', async () => {
    const gitHubClient = client()
    const members = await gitHubClient.getMembersOf('fishcakes')
    assertThat(members, equalTo([testUser, 'funficient']))
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
