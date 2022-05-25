import { Octokit } from '@octokit/core'
import { Commit, Github } from './retireInactiveContributors'
// "TODO: Implement this using actual API calls to GitHub via Octokit library"

export class OctokitGithub implements Github {
  constructor(private readonly octokit: Octokit) {}

  getLastCommitBy(user: string): Commit {
    throw new Error('Function not implemented.')
  }

  addUserToTeam(user: string, alumniTeam: string): void {
    throw new Error('Function not implemented.')
  }

  removeUserFromTeam(user: string, committersTeam: string): void {
    throw new Error('Function not implemented.')
  }

  getMembersOf(team: string): string[] {
    // TODO: implement me!
    throw new Error('Function not implemented.')
  }
}
