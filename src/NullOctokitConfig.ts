import { GithubTeamName, GithubUsername } from './OctokitGitHub'

export type NullOctokitTeamMembers = {
  [teamName: GithubTeamName]: GithubUsername[]
}

export type NullOctokitCommitDates = {
  [memberName: GithubUsername]: Date
}

export class NullOctokitConfig {
  constructor(
    public readonly teamMembers: NullOctokitTeamMembers = {},
    public readonly commitDates: NullOctokitCommitDates = {}
  ) {}

  withTeamMember(user: string, team: string): NullOctokitConfig {
    const existingTeam = this.teamMembers[team] ?? []
    const newTeam = [...existingTeam, user]

    const newTeamMembers: NullOctokitTeamMembers = {
      ...this.teamMembers,
      [team]: newTeam,
    }
    return new NullOctokitConfig(newTeamMembers, this.commitDates)
  }
}
