class UnableToGetMembersError extends Error {}

class UnableToGetRepositoriesError extends Error {}

type GithubRequestError = {
    message: string
    request: {
      url: string
    }
}

function isGithubRequestError(
    candidate: unknown
    ): candidate is GithubRequestError {
    return Boolean(
        candidate && typeof candidate == 'object' && 'request' in candidate
    )
}

export {
    UnableToGetMembersError,
    UnableToGetRepositoriesError,
    GithubRequestError,
    isGithubRequestError
}