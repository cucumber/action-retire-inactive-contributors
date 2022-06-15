import { GitHub } from '@actions/github/lib/utils'
import { Commit, Github } from './retireInactiveContributors'
// "TODO: Implement this using actual API calls to GitHub via Octokit library"

export class OctokitGithub implements Github {
  constructor(private readonly octokit: InstanceType<typeof GitHub>) {}

  getLastCommitBy(user: string): Commit {
    throw new Error('Function not implemented.')
  }

  addUserToTeam(user: string, alumniTeam: string): void {
    throw new Error('Function not implemented.')
  }

  removeUserFromTeam(user: string, committersTeam: string): void {
    throw new Error('Function not implemented.')
  }

  getMembersOf(team: string): string[] {
    // TODO: change interface to make these functions async (i.e. they need to return Promises)
    const result = this.octokit.rest.teams.listMembersInOrg({
      org: 'test-inactive-contributor-action',
      team_slug: team,
    })
    // TODO: parse the result to return the names of the team members
    throw new Error('Function not implemented.')
  }
}