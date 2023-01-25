import { getInput } from '@actions/core'
import { run } from './run'

const token = process.env.GITHUB_TOKEN
if (!token) {
  throw new Error(
    'Please set GITHUB_TOKEN. See https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
  )
}

run(
  getInput('maximum-absence-before-retirement'),
  getInput('github-orgname'),
  getInput('alumni-team'),
  token,
  getInput('dry-run') == 'true'
)
