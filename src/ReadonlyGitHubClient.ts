import { GitHubClient, Logger } from './retireInactiveContributors'

export class ReadOnlyGitHubClient implements GitHubClient {
  constructor(
    private readonly client: GitHubClient,
    private readonly logger: Logger
  ) {}

  hasCommittedSince(author: string, date: Date): Promise<boolean> {
    return this.client.hasCommittedSince(author, date)
  }

  getMembersOf(team: string): Promise<string[]> {
    return this.client.getMembersOf(team)
  }

  addUserToTeam(user: string, alumniTeam: string): Promise<void> {
    this.logger.info(`Read-only: Add user ${user} to ${alumniTeam} team`)
    return Promise.resolve()
  }

  removeUserFromTeam(user: string, committersTeam: string): Promise<void> {
    this.logger.info(
      `Read-only: Remove user ${user} from ${committersTeam} team`
    )
    return Promise.resolve()
  }
}
