import { getOctokit } from '@actions/github'
import * as logger from '@actions/core'
import { Configuration } from './Configuration'
import { OctokitGitHub } from './OctokitGitHub'
import { retireInactiveContributors } from './retireInactiveContributors'
import { RawInputs } from './RawInputs'

export async function run(inputs: RawInputs): Promise<void> {
  const configuration = Configuration.from(inputs)
  const octokit = getOctokit(inputs.token)
  const github = new OctokitGitHub(octokit, inputs.githubOrgname)
  logger.info(JSON.stringify({ configuration }))
  await retireInactiveContributors(github, configuration, logger)
}
