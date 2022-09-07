import { getOctokit } from '@actions/github'
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
  const github = new OctokitGitHub(
    octokit,
    'todo-get-org-from-action-parameters'
  )
  await retireInactiveContributors(github)
}

run()
