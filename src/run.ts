import { getOctokit } from '@actions/github'
import { Configuration } from './Configuration'
import { OctokitGitHub } from './OctokitGitHub'
import { retireInactiveContributors } from './retireInactiveContributors'

export async function run(
  maximumAbsenceBeforeRetirementInput: string,
  githubOrgname: string,
  token: string
): Promise<void> {
  const octokit = getOctokit(token)
  const maximumAbsenceBeforeRetirement = Number(
    maximumAbsenceBeforeRetirementInput
  )
  const github = new OctokitGitHub(octokit, githubOrgname)

  const configuration = new Configuration(maximumAbsenceBeforeRetirement)

  console.log({ configuration })
  await retireInactiveContributors(github, configuration)
}
