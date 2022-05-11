import {
  Commit,
  Github,
  retireInactiveContributors,
} from "./retireInactiveContributors"

async function run(): Promise<void> {
  console.log(
    "TODO: Implement this using actual API calls to GitHub via Octokit library"
  )
  const github: Github = {
    getLastCommitBy(user: string): Commit {
      throw new Error("Function not implemented.")
    },
    addUserToTeam: function (user: string, alumniTeam: string): void {
      throw new Error("Function not implemented.")
    },
    removeUserFromTeam: function (user: string, committersTeam: string): void {
      throw new Error("Function not implemented.")
    },
    getMembersOf(team: string): string[] {
      throw new Error("Function not implemented.")
    }
  }
  await retireInactiveContributors(github)
}

run()
