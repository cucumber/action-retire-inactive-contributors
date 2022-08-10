const oneYearAgo = () =>
  new Date(new Date().setFullYear(new Date().getFullYear() - 1))

export interface GithubClient {
  removeUserFromTeam(user: string, committersTeam: string): Promise<void>
  hasCommittedSince(author: string, date: Date): Promise<boolean>
  addUserToTeam(user: string, alumniTeam: string): Promise<void>
  getMembersOf(team: string): Promise<string[]>
}

export async function retireInactiveContributors(
  github: GithubClient
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
