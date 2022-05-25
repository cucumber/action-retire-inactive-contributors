import assert from 'assert'
import { OctokitGithub } from './OctokitGithub'

describe(OctokitGithub.name, () => {
  it('gets members of a team', async () => {
    const github = new OctokitGithub()
    github.getMembersOf('fishcakes')
  })
})
