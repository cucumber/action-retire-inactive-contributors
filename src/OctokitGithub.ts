import { GitHub } from '@actions/github/lib/utils'
import { Commit, Github } from './retireInactiveContributors'
// "TODO: Implement this using actual API calls to GitHub via Octokit library"

export class OctokitGithub implements Github {
  constructor(
    private readonly octokit: InstanceType<typeof GitHub>,
    private readonly org: string
  ) {}

  getLastCommitBy(user: string): Promise<Commit> {
    throw new Error('Method not implemented.')
  }

  async hasCommittedSince(author: string, date: Date): Promise<boolean> {
    const repos = ['.github'] // TODO: Get the list of "repos" via https://docs.github.com/en/rest/teams/teams#list-team-repositories
    for (const repo of repos) {
      const result = await this.octokit.rest.repos.listCommits({
        owner: this.org,
        repo,
        author,
        since: date.toISOString(),
      })
      if (result.data.length > 0) {
        return true
      }
    }
    return false
  }

  addUserToTeam(user: string, alumniTeam: string): Promise<void> {
    throw new Error('Function not implemented.')
  }

  removeUserFromTeam(user: string, committersTeam: string): Promise<void> {
    throw new Error('Function not implemented.')
  }

  async getMembersOf(team: string): Promise<string[]> {
    // TODO: change interface to make these functions async (i.e. they need to return Promises)
    const result = await this.octokit.rest.teams.listMembersInOrg({
      org: this.org,
      team_slug: team,
    })

    return result.data.map((user) => user.login)
  }
}
