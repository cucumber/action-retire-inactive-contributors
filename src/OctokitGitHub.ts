import {GitHub} from '@actions/github/lib/utils'
import {GitHubClient} from './retireInactiveContributors'
import {EventEmitter} from 'events'
import {OutputTracker} from './OutputTracker'

const CHANGE_EVENT = "changeEvent"

export class OctokitGitHub implements GitHubClient {

  private readonly emitter = new EventEmitter()

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

  async addUserToTeam(user: string, team: string): Promise<void> {
    await this.octokit.rest.teams.addOrUpdateMembershipForUserInOrg({
      org: this.org,
      team_slug: team,
      username: user,
    })
    this.emitter.emit(CHANGE_EVENT, {
      action: "add",
      team,
      user,
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
    const result = await this.octokit.rest.teams.listMembersInOrg({
      org: this.org,
      team_slug: team,
    })
    return result.data.map((user) => user.login)
  }

  trackChanges() {
    return OutputTracker.create(this.emitter, CHANGE_EVENT);
  }
}
