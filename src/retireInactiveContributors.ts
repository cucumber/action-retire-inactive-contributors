export type Commit = {
  date: Date
  user: string
}

const oneYearAgo = () =>
  new Date(new Date().setFullYear(new Date().getFullYear() - 1))

export interface Github {
  removeUserFromTeam(user: string, committersTeam: string): Promise<void>
  hasCommittedSince(author: string, date: Date): Promise<boolean>
  // TODO: deprecated: remove this method and change usages to use hasCommittedSince
  getLastCommitBy(user: string): Promise<Commit>
  addUserToTeam(user: string, alumniTeam: string): Promise<void>
  getMembersOf(team: string): Promise<string[]>
}

export async function retireInactiveContributors(
  github: Github
): Promise<void> {
  const alumniTeam = 'alumni'
  const committersTeam = 'committers'
  const committersTeamMembers = await github.getMembersOf(committersTeam)
  for (const author of committersTeamMembers) {
    if (!(await github.hasCommittedSince(author, oneYearAgo()))) {
      github.addUserToTeam(author, alumniTeam)
      github.removeUserFromTeam(author, committersTeam)
    }
  }
}
