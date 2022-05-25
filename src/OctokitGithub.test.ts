import assert from 'assert'
import { OctokitGithub } from './OctokitGithub'
import { getOctokit } from '@actions/github'

describe(OctokitGithub.name, () => {
  it('gets members of a team', async () => {
    const octokit = getOctokit('github-token')
    const githubAdapter = new OctokitGithub(octokit)
    const members = githubAdapter.getMembersOf('fishcakes')
    assert(members)
  })
})
