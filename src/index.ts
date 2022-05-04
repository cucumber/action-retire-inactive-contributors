import {
  Github,
  retireInactiveContributors,
} from "./retireInactiveContributors"

async function run(): Promise<void> {
  console.log(
    "TODO: Implement this using actual API calls to GitHub via Octokit library"
  )
  const github: Github = {
    getAgeOfLastCommitBy: function (user: string): number {
      throw new Error("Function not implemented.")
    },
    addUserToTeam: function (user: string, alumniTeam: string): void {
      throw new Error("Function not implemented.")
    },
    removeUserFromTeam: function (user: string, committersTeam: string): void {
      throw new Error("Function not implemented.")
    },
  }
  await retireInactiveContributors(github)
}

run()
