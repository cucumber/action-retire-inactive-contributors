import { Configuration } from './Configuration'
import { GitHubClient } from './infrastructure/GitHubClient'
import { retireInactiveContributors } from './retireInactiveContributors'

async function run(): Promise<void> {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    throw new Error(
      'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
    )
  }
  const github = GitHubClient.create(
    token,
    'todo-get-org-from-action-parameters'
  )

  // TODO: read max absence from action parameters
  const configuration = new Configuration()

  await retireInactiveContributors(github, configuration)
}

run()
