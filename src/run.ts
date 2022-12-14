import { Duration } from './Duration'
import { getOctokit } from '@actions/github'
import * as logger from '@actions/core'
import { Configuration } from './Configuration'
import { OctokitGitHub } from './OctokitGitHub'
import { retireInactiveContributors } from './retireInactiveContributors'

export async function run(
  maximumAbsenceBeforeRetirementInput: string,
  githubOrgname: string,
  alumniTeam: string,
  token: string
): Promise<void> {
  const octokit = getOctokit(token)
  const maximumAbsenceBeforeRetirement = Duration.parse(
    maximumAbsenceBeforeRetirementInput
  )
  const github = new OctokitGitHub(octokit, githubOrgname)

  const configuration = new Configuration(
    maximumAbsenceBeforeRetirement,
    alumniTeam
  )
  logger.info(JSON.stringify({ configuration }))
  await retireInactiveContributors(github, configuration, logger)
}
