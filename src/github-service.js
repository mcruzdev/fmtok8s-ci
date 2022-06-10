class GithubService {
    constructor({ oktokit }) {
        this.oktokit = oktokit
    }

    async commitIsFromDefaultBranch({ commitId, defaultBranch, owner, repo }) {
        console.log(`[commitIsFromDefaultBranch]: commitId=${commitId}, defaultBranch=${defaultBranch}, owner=${owner}, repo=${repo}`)

        try {
            const response = await oktokit
                .request(`GET /repos/{owner}/{repo}/compare/{base}...{head}`, {
                    owner,
                    repo,
                    base: defaultBranch,
                    head: commitId
                })
            return response.data.status === 'identical' || response.data.status === 'behind'
        } catch (err) {
            console.log('[commitIsFromDefaultBranch]: Error while requesting compare endpoint: ', err)
            return false
        }
    }
}

module.exports = GithubService