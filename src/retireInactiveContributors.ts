export type Commit = {
  date: Date
  user: string
}

export interface Github {
  removeUserFromTeam(user: string, committersTeam: string): void
  getLastCommitBy(user: string): Commit
  addUserToTeam(user: string, alumniTeam: string): void
  getMembersOf(team: string): string[]
}

export function retireInactiveContributors(github: Github) {
  // return alumni team, a member called Greg and the last commit date
  const alumniTeam = "alumni"
  const committersTeam = "committers"
  const committersTeamMembers = github.getMembersOf(committersTeam)
  for (const user of committersTeamMembers){
    const lastCommit = github.getLastCommitBy(user)
    const oneDay = 1000 * 60 * 60 * 24;
    const daysSinceLastCommit =  Math.round((new Date().getTime() - lastCommit.date.getTime()) / oneDay)
    if (daysSinceLastCommit >= 365) {
      github.addUserToTeam(user, alumniTeam)
      github.removeUserFromTeam(user, committersTeam)
    }
  }
}
