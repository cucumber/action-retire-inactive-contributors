import { Configuration } from './Configuration'

export interface GitHubClient {
  removeUserFromTeam(user: string, committersTeam: string): Promise<void>
  hasCommittedSince(author: string, date: Date): Promise<boolean>
  addUserToTeam(user: string, alumniTeam: string): Promise<void>
  getMembersOf(team: string): Promise<string[]>
}

export async function retireInactiveContributors(
  github: GitHubClient,
  configuration: Configuration
): Promise<void> {
  const maximumAbsenceBeforeRetirement =
    configuration.maximumAbsenceBeforeRetirement
  const cutOffDate = new Date(
    new Date().getTime() - maximumAbsenceBeforeRetirement
  )
  const alumniTeam = 'alumni'
  const committersTeam = 'committers'
  const committersTeamMembers = await github.getMembersOf(committersTeam)
  for (const author of committersTeamMembers) {
    if (!(await github.hasCommittedSince(author, cutOffDate))) {
      github.addUserToTeam(author, alumniTeam)
      github.removeUserFromTeam(author, committersTeam)
    }
  }
}
