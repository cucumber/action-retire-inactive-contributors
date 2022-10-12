import { GitHub } from '@actions/github/lib/utils'
import { UnableToGetMembersError } from './Errors'
import { GitHubClient } from './retireInactiveContributors'

export class OctokitGitHub implements GitHubClient {
  constructor(
    private readonly octokit: InstanceType<typeof GitHub>,
    private readonly org: string
  ) {}

  async hasCommittedSince(author: string, date: Date): Promise<boolean> {
    const response = await this.octokit.rest.repos.listForOrg({ org: this.org })
    const repos = response.data.map((repoData) => repoData.name)
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

  async addUserToTeam(user: string, alumniTeam: string): Promise<void> {
    await this.octokit.rest.teams.addOrUpdateMembershipForUserInOrg({
      org: this.org,
      team_slug: alumniTeam,
      username: user,
    })
  }

  async removeUserFromTeam(
    user: string,
    committersTeam: string
  ): Promise<void> {
    await this.octokit.rest.teams.removeMembershipForUserInOrg({
      org: this.org,
      team_slug: committersTeam,
      username: user,
    })
  }

  async getMembersOf(team: string): Promise<string[]> {
    try {
      const result = await this.octokit.rest.teams.listMembersInOrg({
        org: this.org,
        team_slug: team,
      })
      return result.data.map((user) => user.login)
    } catch (err) {
      throw new UnableToGetMembersError()
    }
  }
}
