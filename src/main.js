const core = require('@actions/core')
const github = require('@actions/github')

class Main {
    constructor({ semver, util, githubService }) {
        this.semver = semver
        this.util = util
        this.githubService = githubService
    }

    async exec({ ref, repo, owner, defaultBranch, commitId }) {

        const tag = this.util.extractTag(ref)

        if (tag && !this.semver.isValid(tag)) {
            core.setFailed('[fmtok8s:CI] Invalid Semver')
        }

        const isFromDefaultBranch = await this.githubService.commitIsFromDefaultBranch({
            commitId,
            owner,
            repo,
            defaultBranch,
        })

        if (!isFromDefaultBranch) {
            core.setFailed(`[fmtok8s:CI] You can create a tag only from ${defaultBranch}`)
        }
    }
}

module.exports = Main