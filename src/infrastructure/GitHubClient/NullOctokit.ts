import {
  Octokit,
  OctokitCommitList,
  OctokitMemberList,
  OctokitRepoList,
} from './Octokit'
import { GitHubClientNullConfig } from './GitHubClientNullConfig'
import { GitHubUsername } from './GitHubClient'

export class NullOctokit implements Octokit {
  constructor(private readonly config: GitHubClientNullConfig) {}

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

export async function nextTick() {
  return new Promise((resolve) => setImmediate(resolve))
}

export class NullRepoList implements OctokitRepoList {
  get data() {
    return [
      {
        name: 'null_octokit_repo',
      },
    ]
  }
}

export class NullCommitList implements OctokitCommitList {
  constructor(private readonly hasCommits: boolean) {}

  get data() {
    return this.hasCommits ? ['null_octokit_commit'] : []
  }
}

export class NullMembersList implements OctokitMemberList {
  constructor(private readonly teamMembers: GitHubUsername[]) {}

  get data() {
    return this.teamMembers.map((login: string) => ({ login }))
  }
}
