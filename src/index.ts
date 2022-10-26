import { getOctokit } from '@actions/github'
import { getInput } from '@actions/core'
import { Configuration } from './Configuration'
import { OctokitGitHub } from './OctokitGitHub'
import { retireInactiveContributors } from './retireInactiveContributors'

async function run(): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error(
      'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    )
  }
  const octokit = getOctokit(token)
  const githubOrgname = getInput('github-orgname')
  const maximumAbsenceBeforeRetirement = Number(
    getInput('maximum-absence-before-retirement')
  )
  const github = new OctokitGitHub(octokit, githubOrgname)

  const configuration = new Configuration(maximumAbsenceBeforeRetirement)

  await retireInactiveContributors(github, configuration)
}

run()
