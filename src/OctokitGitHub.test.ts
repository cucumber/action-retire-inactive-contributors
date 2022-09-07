import { OctokitGitHub } from './OctokitGitHub'
import { getOctokit } from '@actions/github'
import { assertThat, equalTo, falsey, hasItem, is } from 'hamjest'
const org = 'test-inactive-contributor-action'
const team_slug = 'test-Alumni'

describe(OctokitGitHub.name, () => {
  context('adding someone to a team', () => {
    it('adds a new member to a team', async () => {
      const token = process.env.GITHUB_TOKEN
      if (!token) {
        throw new Error(
          'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
        )
      }
      const octokit = getOctokit(token)
      const gitHubClient = new OctokitGitHub(octokit, org)
      const initialMembers = await gitHubClient.getMembersOf('test-Alumni')
      for (const member of initialMembers) {
        octokit.rest.teams.removeMembershipForUserInOrg({
          org,
          team_slug,
          username: member,
        })
      }
      await gitHubClient.addUserToTeam('blaisep', 'test-Alumni')
      const members = await gitHubClient.getMembersOf('test-Alumni')
      assertThat(members, hasItem('blaisep'))
    })
  })

  context('working out if a user has committed recently', () => {
    it('returns false if they have not', async () => {
      const token = process.env.GITHUB_TOKEN
      if (!token) {
        throw new Error(
          'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
        )
      }
      const octokit = getOctokit(token)
      const gitHubClient = new OctokitGitHub(
        octokit,
        'test-inactive-contributor-action'
      )
      const hasCommitted = await gitHubClient.hasCommittedSince(
        'olleolleolle',
        new Date()
      )
      assertThat(hasCommitted, is(falsey()))
    })

    it('returns true if they have', async () => {
      const token = process.env.GITHUB_TOKEN
      if (!token) {
        throw new Error(
          'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
        )
      }
      const octokit = getOctokit(token)
      const gitHubClient = new OctokitGitHub(
        octokit,
        'test-inactive-contributor-action'
      )
      const dateOnWhichMattCommitted = new Date(2022, 3, 1) // April 1.
      const hasCommitted = await gitHubClient.hasCommittedSince(
        'mattwynne',
        dateOnWhichMattCommitted
      )
      assertThat(hasCommitted, is(true))
    })
  })

  it('gets members of a team', async () => {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error(
        'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
      )
    }
    const octokit = getOctokit(token)
    const gitHubClient = new OctokitGitHub(
      octokit,
      'test-inactive-contributor-action'
    )
    const members = await gitHubClient.getMembersOf('fishcakes')
    assertThat(members, equalTo(['blaisep', 'funficient']))
  })
})
