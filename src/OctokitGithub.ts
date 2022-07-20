import { Commit, Github } from './retireInactiveContributors'
// "TODO: Implement this using actual API calls to GitHub via Octokit library"

export class OctokitGithub implements Github {
  getLastCommitBy(user: string): Promise<Commit> {
    throw new Error('Function not implemented.')
  }

  addUserToTeam(user: string, alumniTeam: string): Promise<void> {
    throw new Error('Function not implemented.')
  }

  removeUserFromTeam(user: string, committersTeam: string): Promise<void> {
    throw new Error('Function not implemented.')
  }

  getMembersOf(team: string): Promise<string[]> {
    throw new Error('Function not implemented.')
  }
}
