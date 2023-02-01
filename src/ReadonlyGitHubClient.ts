import { GitHubClient } from './retireInactiveContributors'

export class ReadOnlyGitHubClient implements GitHubClient {
  constructor(private readonly client: GitHubClient) {}

  hasCommittedSince(author: string, date: Date): Promise<boolean> {
    return this.client.hasCommittedSince(author, date)
  }

  getMembersOf(team: string): Promise<string[]> {
    return this.client.getMembersOf(team)
  }

  addUserToTeam(): Promise<void> {
    return Promise.resolve()
  }

  removeUserFromTeam(): Promise<void> {
    return Promise.resolve()
  }
}
