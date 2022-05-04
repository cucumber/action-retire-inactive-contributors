import {
  Github,
  retireInactiveContributors,
} from "./retireInactiveContributors"

async function run(): Promise<void> {
  const github: Github = {
    getAgeOfLastCommitBy: function (user: string): number {
      console.log(
        "TODO: Implement this using actual API calls to GitHub via Octokit library"
      )
      throw new Error("Function not implemented.")
    },
    addUserToTeam: function (user: string, alumniTeam: string): void {
      console.log(
        "TODO: Implement this using actual API calls to GitHub via Octokit library"
      )
      throw new Error("Function not implemented.")
    },
  }
  await retireInactiveContributors(github)
}

run()
