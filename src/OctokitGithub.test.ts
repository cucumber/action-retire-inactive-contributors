import { OctokitGithub } from './OctokitGithub'
import { getOctokit } from '@actions/github'
import { assertThat, equalTo, falsey, is } from 'hamjest'

describe(OctokitGithub.name, () => {
  context('working out if a user has committed recently', () => {
    it('returns false if they have not', async () => {
      const token = process.env.GITHUB_TOKEN
      if (!token) {
        throw new Error(
          'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
        )
      }
      const octokit = getOctokit(token)
      const githubAdapter = new OctokitGithub(
        octokit,
        'test-inactive-contributor-action'
      )
      const hasCommitted = await githubAdapter.hasCommittedSince(
        'olleolleolle',
        new Date()
      )
      assertThat(hasCommitted, is(falsey()))
    })
    // TODO: implement this test!
    it('returns true if they have')
  })

  it('gets members of a team', async () => {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error(
        'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
      )
    }
    const octokit = getOctokit(token)
    const githubAdapter = new OctokitGithub(
      octokit,
      'test-inactive-contributor-action'
    )
    const members = await githubAdapter.getMembersOf('fishcakes')
    assertThat(members, equalTo(['blaisep', 'funficient']))
  })
})
