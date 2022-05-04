export interface Github {
  removeUserFromTeam(user: string, committersTeam: string): void
  getAgeOfLastCommitBy(user: string): number
  addUserToTeam(user: string, alumniTeam: string): void
}

export function retireInactiveContributors(github: Github) {
  // return alumni team, a member called Greg and the last commit date
  const alumniTeam = "alumni"
  const committersTeam = "committers"
  const user = "Greg"
  console.log("TODO: Look Greg up rather than hardcoded users")
  const daysSinceLastCommit = github.getAgeOfLastCommitBy(user)
  if (daysSinceLastCommit >= 365) {
    github.addUserToTeam(user, alumniTeam)
    github.removeUserFromTeam(user, committersTeam)
  }
}
