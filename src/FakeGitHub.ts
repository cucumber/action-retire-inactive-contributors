import { Commit, Github } from './retireInactiveContributors'

export class FakeGitHub implements Github {
  private readonly membersOfTeam = new Map<string, string[]>()
  private readonly commitsByUser = new Map<string, Commit[]>()

  async getMembersOf(team: string): Promise<string[]> {
    return this.membersOfTeam.get(team) || []
  }

  async addUserToTeam(user: string, team: string): Promise<void> {
    const updatedUsers = [...(await this.getMembersOf(team)), user]
    this.membersOfTeam.set(team, updatedUsers)
  }

  async removeUserFromTeam(user: string, team: string): Promise<void> {
    const updatedUsers = (await this.getMembersOf(team)).filter(
      (member) => member !== user
    )
    this.membersOfTeam.set(team, updatedUsers)
  }

  async hasCommittedSince(author: string, date: Date): Promise<boolean> {
    return false // TODO: Make this settable & queryable.
  }

  async getLastCommitBy(user: string): Promise<Commit> {
    console.warn('Deprecated! Use hasCommittedSince instead')
    return this.getCommitsByUser(user)[0]
  }

  createCommit(user: string, daysAgo: number) {
    const today = new Date()
    const date = new Date(today.setDate(today.getDate() - daysAgo))
    const commit: Commit = { user, date }
    const updatedCommits = [...this.getCommitsByUser(user), commit]
    this.commitsByUser.set(user, updatedCommits)
  }

  getCommitsByUser(user: string): Commit[] {
    return this.commitsByUser.get(user) || []
  }
}
