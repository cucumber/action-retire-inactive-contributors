import {GitHub} from '@actions/github/lib/utils'
import {GitHubClient} from './retireInactiveContributors'
import {EventEmitter} from 'events'
import {OutputTracker} from './OutputTracker'

const CHANGE_EVENT = "changeEvent"

export class OctokitGitHub implements GitHubClient {

  private readonly emitter = new EventEmitter()

  static createNull(options: any = {}) {
    return new OctokitGitHub(new NullOctokit(options), '')
  }

  constructor(
    // TODO: private readonly octokit: (InstanceType<typeof GitHub> || null),
    private readonly octokit: any,
    private readonly org: string
  ) {}

  async hasCommittedSince(author: string, date: Date): Promise<boolean> {
    const response = await this.octokit.rest.repos.listForOrg({ org: this.org })
    const repos = response.data.map((repoData: any) => repoData.name)
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
    team: string
  ): Promise<void> {
    await this.octokit.rest.teams.removeMembershipForUserInOrg({
      org: this.org,
      team_slug: team,
      username: user,
    })
    this.emitter.emit(CHANGE_EVENT, {
      action: "remove",
      team,
      user,
    })
  }

  async getMembersOf(team: string): Promise<string[]> {
    const result = await this.octokit.rest.teams.listMembersInOrg({
      org: this.org,
      team_slug: team,
    })
    return result.data.map((user: any) => user.login)
  }

  trackChanges() {
    return OutputTracker.create(this.emitter, CHANGE_EVENT);
  }

}

class NullOctokit {
  private teamMembers: any
  private hasCommitted: any

  constructor({ teamMembers = [ [] ], hasCommitted = [] }) {
    this.teamMembers = teamMembers
    this.hasCommitted = hasCommitted
  }

  get rest() {
    const teamMembers = this.teamMembers
    const hasCommitted = this.hasCommitted
    return {
      teams: {
        addOrUpdateMembershipForUserInOrg() {},
        removeMembershipForUserInOrg() {},
        listMembersInOrg(): any { return new NullMembersList(teamMembers.shift()) },
      },
      repos: {
        listForOrg() { return new NullRepoList() },
        listCommits() { return new NullCommitList(hasCommitted.shift()) },
      }
    }
  }
}

class NullRepoList {
  get data() { return [{
    name: "null_octokit_repo"
  }] }
}

class NullCommitList {
  constructor (private readonly hasCommitted: any) {}
  get data() { return this.hasCommitted ? [ 'null_octokit_commit' ] : [] }
}

class NullMembersList {
  constructor (private readonly teamMembers: any) {
  }

  get data() { return this.teamMembers.map((login: string) => ({ login })) }
}
