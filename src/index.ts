import { retireInactiveContributors } from "./retireInactiveContributors"

async function run(): Promise<void> {
  await retireInactiveContributors()
}

run()
