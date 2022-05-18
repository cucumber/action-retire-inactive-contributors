import { OctokitGithub } from "./OctokitGithub"
import { retireInactiveContributors } from "./retireInactiveContributors"

async function run(): Promise<void> {
  const github = new OctokitGithub()
  await retireInactiveContributors(github)
}

run()
