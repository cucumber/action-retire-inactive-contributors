export interface Github{
  getAgeOfLastCommitBy(user: string): number;
  addUserToTeam(user: string, alumniTeam: string): void;
}

export function retireInactiveContributors(github: Github) {
  // return alumni team, a member called Greg and the last commit date
  const alumniTeam = "alumni"
  const user = "Greg"
  const daysSinceLastCommit = github.getAgeOfLastCommitBy(user)
  if (daysSinceLastCommit >= 365) {
    github.addUserToTeam(user, alumniTeam)
  }
}
