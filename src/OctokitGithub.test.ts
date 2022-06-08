import assert from 'assert'
import { OctokitGithub } from './OctokitGithub'
import { getOctokit } from '@actions/github'

describe(OctokitGithub.name, () => {
  it('gets members of a team', async () => {
    const token = process.env.GITHUB_TOKEN
    if (!token) {
      throw new Error(
        'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
      )
    }
    const octokit = getOctokit(token)
    const githubAdapter = new OctokitGithub(octokit)
    const members = githubAdapter.getMembersOf('fishcakes')
    assert(members)
  })
})
