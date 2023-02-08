import { GitHubClient, Logger } from './retireInactiveContributors'

export class UpdatingGitHubClient implements GitHubClient {
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
    this.logger.info(`Adding user ${user} to ${alumniTeam} team`)
    return this.client.addUserToTeam(user, alumniTeam)
  }

  removeUserFromTeam(user: string, committersTeam: string): Promise<void> {
    this.logger.info(`Removing user ${user} from ${committersTeam} team`)
    return this.client.removeUserFromTeam(user, committersTeam)
  }
}
