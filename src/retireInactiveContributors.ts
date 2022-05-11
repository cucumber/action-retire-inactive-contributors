export interface Github {
  removeUserFromTeam(user: string, committersTeam: string): void
  getAgeOfLastCommitBy(user: string): number
  addUserToTeam(user: string, alumniTeam: string): void
  getMembersOf(team: string): string[]
}

export function retireInactiveContributors(github: Github) {
  // return alumni team, a member called Greg and the last commit date
  const alumniTeam = "alumni"
  const committersTeam = "committers"
  const committersTeamMembers = github.getMembersOf(committersTeam)
  for (const user of committersTeamMembers){
    const daysSinceLastCommit = github.getAgeOfLastCommitBy(user)
    if (daysSinceLastCommit >= 365) {
      github.addUserToTeam(user, alumniTeam)
      github.removeUserFromTeam(user, committersTeam)
    }
  }
}
