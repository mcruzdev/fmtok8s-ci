const core = require('@actions/core')

class GithubService {
    constructor({ oktokit }) {
        this.oktokit = oktokit
    }

    async commitIsFromDefaultBranch({ commitId, defaultBranch, owner, repo }) {
        try {
            const response = await this.oktokit
                .request(`GET /repos/{owner}/{repo}/compare/{base}...{head}`, {
                    owner,
                    repo,
                    base: defaultBranch,
                    head: commitId
                })
            return response.data.status === 'identical' || response.data.status === 'behind'
        } catch (err) {
            core.error('[commitIsFromDefaultBranch]: Error while requesting compare endpoint: ', err)
            return false
        }
    }
}

module.exports = GithubService