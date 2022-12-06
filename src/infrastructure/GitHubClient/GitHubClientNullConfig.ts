import { GitHubTeamName, GitHubUsername } from './GitHubClient'

export class GitHubClientNullConfig {
  constructor(
    public readonly teamMembers: NullOctokitTeamMembers = {},
    public readonly commitDates: NullOctokitCommitDates = {}
  ) {}

  withTeamMember(user: string, team: string): GitHubClientNullConfig {
    const existingTeam = this.teamMembers[team] ?? []
    const newTeam = [...existingTeam, user]

    const newTeamMembers: NullOctokitTeamMembers = {
      ...this.teamMembers,
      [team]: newTeam,
    }
    return new GitHubClientNullConfig(newTeamMembers, this.commitDates)
  }

  withLastCommit(user: string, date: Date): GitHubClientNullConfig {
    const commitDates = { ...this.commitDates, [user]: date }
    return new GitHubClientNullConfig(this.teamMembers, commitDates)
  }
}

type NullOctokitTeamMembers = {
  [teamName: GitHubTeamName]: GitHubUsername[]
}

type NullOctokitCommitDates = {
  [memberName: GitHubUsername]: Date
}
