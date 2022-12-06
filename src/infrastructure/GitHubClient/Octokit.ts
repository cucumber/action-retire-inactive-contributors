export type Octokit = {
  rest: {
    teams: {
      addOrUpdateMembershipForUserInOrg: (args: {
        org: string
        team_slug: string
        username: string
      }) => Promise<unknown>
      removeMembershipForUserInOrg: (args: {
        org: string
        team_slug: string
        username: string
      }) => Promise<unknown>
      listMembersInOrg: (args: {
        org: string
        team_slug: string
      }) => Promise<OctokitMemberList>
    }
    repos: {
      listForOrg: (args: { org: string }) => Promise<OctokitRepoList>
      listCommits: (args: {
        owner: string
        repo: string
        author: string
        since: string
      }) => Promise<OctokitCommitList>
    }
  }
}

export type OctokitMember = {
  login: string
}

export type OctokitRepo = {
  name: string
}

type OctokitResponse<T> = {
  data: T[]
}

export type OctokitMemberList = OctokitResponse<OctokitMember>
export type OctokitRepoList = OctokitResponse<OctokitRepo>
export type OctokitCommitList = OctokitResponse<unknown>
