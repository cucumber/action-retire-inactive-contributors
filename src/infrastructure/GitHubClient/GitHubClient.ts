import { getOctokit } from '@actions/github'
import { EventEmitter } from 'events'
import { OutputTracker } from '../common/OutputTracker'
import { GitHubClientNullConfig } from './GitHubClientNullConfig'
import { NullOctokit } from './NullOctokit'
import { Octokit, OctokitMember, OctokitRepo } from './Octokit'

const CHANGE_EVENT = 'changeEvent'

export type GitHubTeamName = string
export type GitHubUsername = string
export type GitHubChange = {
  action: 'add' | 'remove'
  user: string
  team: string
}

export class GitHubClient {
  private readonly emitter = new EventEmitter()

  static create(token: string, org: string) {
    const octokit = getOctokit(token)
    return new GitHubClient(octokit, org)
  }

  static createNull(
    config: GitHubClientNullConfig = new GitHubClientNullConfig()
  ) {
    return new GitHubClient(new NullOctokit(config), '')
  }

  private constructor(
    private readonly octokit: Octokit,
    private readonly org: string
  ) {}

  async hasCommittedSince(author: string, date: Date): Promise<boolean> {
    const response = await this.octokit.rest.repos.listForOrg({ org: this.org })
    const repos = response.data.map((repoData: OctokitRepo) => repoData.name)
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
      action: 'add',
      team,
      user,
    })
  }

  async removeUserFromTeam(user: string, team: string): Promise<void> {
    await this.octokit.rest.teams.removeMembershipForUserInOrg({
      org: this.org,
      team_slug: team,
      username: user,
    })
    this.emitter.emit(CHANGE_EVENT, {
      action: 'remove',
      team,
      user,
    })
  }

  async getMembersOf(team: string): Promise<string[]> {
    const result = await this.octokit.rest.teams.listMembersInOrg({
      org: this.org,
      team_slug: team,
    })
    return result.data.map((user: OctokitMember) => user.login)
  }

  trackChanges(): OutputTracker<GitHubChange> {
    return OutputTracker.create<GitHubChange>(this.emitter, CHANGE_EVENT)
  }
}
