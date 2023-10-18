import { GitHub } from '@actions/github/lib/utils'
import { UnableToGetMembersError } from './Errors'
import { GitHubClient, Logger } from './retireInactiveContributors'

export class OctokitGitHub implements GitHubClient {
  constructor(
    private readonly octokit: InstanceType<typeof GitHub>,
    private readonly org: string,
    private readonly logger: Logger
  ) {}

  async hasCommittedSince(author: string, date: Date): Promise<boolean> {
    const response = await this.octokit.rest.repos.listForOrg({ org: this.org })
    const repos = response.data.map((repoData) => repoData.name)
    for (const repo of repos) {
      this.logger.info(`Checking for recent commits in '${repo}' repo...`)
      const result = await this.octokit.rest.repos.listCommits({
        owner: this.org,
        repo,
        author,
        since: date.toISOString(),
      })
      if (result.data.length > 0) {
        // logger.info("Found ${result.data.length} recent commits.")
        return true
      }
    }
    // logger.info("Found no recent commits :(")
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
      const result = await this.octokit.paginate(
        this.octokit.rest.teams.listMembersInOrg,
        {
          org: this.org,
          team_slug: team,
        }
      )
      return result.map((user) => user.login)
    } catch (err: unknown) {
      if (isGithubRequestError(err)) {
        throw new UnableToGetMembersError(
          `${err.message}, unable to get members of ${team} from: ${err.request.url}`
        )
      }
      throw err
    }
  }
}

type GithubRequestError = {
  message: string
  request: {
    url: string
  }
}

function isGithubRequestError(
  candidate: unknown
): candidate is GithubRequestError {
  return Boolean(
    candidate && typeof candidate == 'object' && 'request' in candidate
  )
}
