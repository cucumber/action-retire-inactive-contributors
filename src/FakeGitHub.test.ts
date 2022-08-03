import { FakeGitHub } from './FakeGitHub'
import { assertThat, equalTo, falsey, is } from 'hamjest'

describe(FakeGitHub.name, () => {
  context('working out if a user has committed recently', () => {
    it('returns false if they have not', async () => {
      const githubAdapter = new FakeGitHub()
      const hasCommitted = await githubAdapter.hasCommittedSince(
        'olleolleolle',
        new Date()
      )
      assertThat(hasCommitted, is(falsey()))
    })

    it('returns true if they have', async () => {
      const longAgo = new Date(2020, 1, 1)
      const githubAdapter = new FakeGitHub()
      githubAdapter.createCommit('mattwynne', 0)
      const hasCommitted = await githubAdapter.hasCommittedSince(
        'mattwynne',
        longAgo
      )
      assertThat(hasCommitted, is(true))
    })

    it('returns false if they have committed earlier than the given date', async () => {
      const today = new Date()
      const githubAdapter = new FakeGitHub()
      githubAdapter.createCommit('mattwynne', 100)
      const hasCommitted = await githubAdapter.hasCommittedSince(
        'mattwynne',
        today
      )
      assertThat(hasCommitted, is(false))
    })
  })

  it('gets members of a team', async () => {
    // const token = process.env.GITHUB_TOKEN
    // if (!token) {
    //   throw new Error(
    //     'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    //   )
    // }
    // const octokit = getOctokit(token)
    // const githubAdapter = new OctokitGithub(
    //   octokit,
    //   'test-inactive-contributor-action'
    // )
    // const members = await githubAdapter.getMembersOf('fishcakes')
    // assertThat(members, equalTo(['blaisep', 'funficient']))
  })
})
