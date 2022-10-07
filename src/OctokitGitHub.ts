import { GitHubClient } from './retireInactiveContributors'
import { EventEmitter } from 'events'
import { OutputTracker } from './OutputTracker'
import { GitHub } from '@actions/github/lib/utils'

const CHANGE_EVENT = 'changeEvent'

type OctokitRepo = { name: string }
type OctokitMember = { login: string }
type OctokitCommit = unknown

type OctokitResponse<Resource> = {
  data: Resource[]
}

type ListReposForOrg = ({
  org,
}: {
  org: string
}) => Promise<OctokitResponse<OctokitRepo>>

type ListCommits = ({
  owner,
  repo,
  author,
  since,
}: {
  owner: string
  repo: string
  author: string
  since: string
}) => Promise<OctokitResponse<OctokitCommit>>

type ListMembers = ({
  org,
  team_slug,
}: {
  org: string
  team_slug: string
}) => Promise<OctokitResponse<OctokitMember>>

type AddRemoveMember = ({
  org,
  team_slug,
  username,
}: {
  org: string
  team_slug: string
  username: string
}) => Promise<unknown>

type Octokit = {
  rest: {
    repos: {
      listForOrg: ListReposForOrg
      listCommits: ListCommits
    }
    teams: {
      addOrUpdateMembershipForUserInOrg: AddRemoveMember
      removeMembershipForUserInOrg: AddRemoveMember
      listMembersInOrg: ListMembers
    }
  }
}

export class OctokitGitHub implements GitHubClient {
  private readonly emitter = new EventEmitter()

  static createNull(options: NullOctokitOptions = {}) {
    return new OctokitGitHub(
      new NullOctokit({ ...defaultOptions, ...options }),
      'an-org'
    )
  }

  static create(octokit: InstanceType<typeof GitHub>, org: string) {
    return new OctokitGitHub(octokit, org)
  }

  constructor(
    private readonly octokit: Octokit,
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
    return result.data.map((user) => user.login)
  }

  trackChanges() {
    return OutputTracker.create(this.emitter, CHANGE_EVENT)
  }
}

type NullOctokitTeamMembers = string[]
type NullOctokitHasCommitted = boolean

type NullOctokitOptions = {
  teamMembers?: NullOctokitTeamMembers[]
  hasCommitted?: NullOctokitHasCommitted[]
}

const defaultTeamMembers: string[] = []
const defaultHasCommitted = false
const defaultOptions: NullOctokitOptions = {
  teamMembers: [defaultTeamMembers],
  hasCommitted: [defaultHasCommitted],
}

class NullOctokit implements Octokit {
  constructor(private readonly options: NullOctokitOptions) {}

  get rest() {
    return {
      teams: {
        addOrUpdateMembershipForUserInOrg() {
          return Promise.resolve()
        },
        removeMembershipForUserInOrg() {
          return Promise.resolve()
        },
        listMembersInOrg: () => {
          const teamMembers =
            (this.options.teamMembers || []).shift() || defaultTeamMembers
          return Promise.resolve(new NullMembersList(teamMembers))
        },
      },
      repos: {
        listForOrg() {
          return Promise.resolve(new NullRepoList())
        },
        listCommits: () => {
          const hasCommitted =
            (this.options.hasCommitted || []).shift() || defaultHasCommitted
          return Promise.resolve(new NullCommitList(hasCommitted))
        },
      },
    }
  }
}

class NullRepoList {
  get data() {
    return [
      {
        name: 'null_octokit_repo',
      },
    ]
  }
}

class NullCommitList {
  constructor(private readonly hasCommitted: NullOctokitHasCommitted) {}
  get data() {
    return this.hasCommitted ? ['null_octokit_commit'] : []
  }
}

class NullMembersList implements OctokitResponse<OctokitMember> {
  constructor(private readonly teamMembers: NullOctokitTeamMembers) {}

  get data() {
    return this.teamMembers.map((login: string) => ({ login }))
  }
}
