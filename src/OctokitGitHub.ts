import { GitHubClient } from './retireInactiveContributors'
import { EventEmitter } from 'events'
import { OutputTracker } from './OutputTracker'
import {
  Octokit,
  OctokitCommitList,
  OctokitMember,
  OctokitMemberList,
  OctokitRepo,
  OctokitRepoList,
} from './Octokit'

const CHANGE_EVENT = 'changeEvent'

type GithubTeamName = string
type GithubUsername = string

export class OctokitGitHub implements GitHubClient {
  private readonly emitter = new EventEmitter()

  static createNull(config: NullOctokitConfig = new NullOctokitConfig()) {
    return new OctokitGitHub(new NullOctokit(config), '')
  }

  constructor(
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

  trackChanges() {
    return OutputTracker.create(this.emitter, CHANGE_EVENT)
  }
}

class NullOctokit implements Octokit {
  constructor(private readonly config: NullOctokitConfig) {}

  get rest() {
    return {
      teams: {
        addOrUpdateMembershipForUserInOrg: async () => nextTick(),
        removeMembershipForUserInOrg: async () => nextTick(),
        listMembersInOrg: async ({ team_slug }: { team_slug: string }) => {
          await nextTick()
          return new NullMembersList(this.config.teamMembers[team_slug] ?? [])
        },
      },
      repos: {
        listForOrg: async () => {
          await nextTick()
          return new NullRepoList()
        },
        listCommits: async ({
          author,
          since,
        }: {
          author: string
          since: string
        }) => {
          const commitDate = this.config.commitDates[author]
          if (commitDate === undefined)
            throw new Error(
              `Attempted to discover commits for null user '${author}', but it wasn't configured`
            )
          await nextTick()
          return new NullCommitList(new Date(since) <= commitDate)
        },
      },
    }
  }
}

async function nextTick() {
  return new Promise((resolve) => setImmediate(resolve))
}

class NullRepoList implements OctokitRepoList {
  get data() {
    return [
      {
        name: 'null_octokit_repo',
      },
    ]
  }
}

class NullCommitList implements OctokitCommitList {
  constructor(private readonly hasCommits: boolean) {}

  get data() {
    return this.hasCommits ? ['null_octokit_commit'] : []
  }
}

class NullMembersList implements OctokitMemberList {
  constructor(private readonly teamMembers: GithubUsername[]) {}

  get data() {
    return this.teamMembers.map((login: string) => ({ login }))
  }
}

type NullOctokitTeamMembers = {
  [teamName: GithubTeamName]: GithubUsername[]
}

type NullOctokitCommitDates = {
  [memberName: GithubUsername]: Date
}

export class NullOctokitConfig {
  constructor(
    public readonly teamMembers: NullOctokitTeamMembers = {},
    public readonly commitDates: NullOctokitCommitDates = {}
  ) {}
}
