import { Configuration } from './Configuration'
import { OctokitGitHub } from './OctokitGitHub'
import { Today } from './Today'

export async function retireInactiveContributors(
  github: OctokitGitHub,
  configuration: Configuration
): Promise<void> {
  const cutOffDate = Today.minus(configuration.maximumAbsenceBeforeRetirement)
  const alumniTeam = 'alumni'
  const committersTeam = 'committers'
  const committersTeamMembers = await github.getMembersOf(committersTeam)
  for (const author of committersTeamMembers) {
    if (!(await github.hasCommittedSince(author, cutOffDate))) {
      await github.addUserToTeam(author, alumniTeam)
      await github.removeUserFromTeam(author, committersTeam)
    }
  }
}
