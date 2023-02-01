import { Configuration } from './Configuration'
import { ReadOnlyGitHubClient } from './ReadonlyGitHubClient'
import { Today } from './Today'

export interface GitHubClient {
  removeUserFromTeam(user: string, committersTeam: string): Promise<void>
  hasCommittedSince(author: string, date: Date): Promise<boolean>
  addUserToTeam(user: string, alumniTeam: string): Promise<void>
  getMembersOf(team: string): Promise<string[]>
}

export interface Logger {
  info(message: string): void
}

export async function retireInactiveContributors(
  github: GitHubClient,
  configuration: Configuration,
  logger: Logger
): Promise<void> {
  if (configuration.dryRun == 'read-only') {
    github = new ReadOnlyGitHubClient(github)
  }
  const cutOffDate = Today.minus(configuration.maximumAbsenceBeforeRetirement)
  const alumniTeam = configuration.alumniTeam
  const committersTeam = 'committers'
  const committersTeamMembers = await github.getMembersOf(committersTeam)
  logger.info(
    `Reviewing permissions for ${committersTeamMembers.length} users...`
  )
  for (const author of committersTeamMembers) {
    if (!(await github.hasCommittedSince(author, cutOffDate))) {
      await github.addUserToTeam(author, alumniTeam)
      logger.info(`Added user ${author} to ${alumniTeam} team`)
      await github.removeUserFromTeam(author, committersTeam)
      logger.info(`Removed user ${author} from ${committersTeam} team`)
    }
  }
}
