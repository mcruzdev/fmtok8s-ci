const core = require('@actions/core')

class Main {
    constructor({ semver, util, githubService }) {
        this.semver = semver
        this.util = util
        this.githubService = githubService
    }

    async exec({ ref, repo, owner, defaultBranch, commitId }) {

        // outputs (default)
        this._setVersionToUse('v0.0.1')

        const isTag = this.util.isTag(ref)
        // tag
        if (isTag) {
            const tag = this.util.extractTag(ref)
            await this._validateTag({ tag, repo, owner, defaultBranch, commitId })
            this._setVersionToUse(tag)
        } else {
            this._validateBranch({ ref, defaultBranch })
        }
    }

    async _validateBranch({ ref, defaultBranch }) {
        const branch = this.util.extractBranch(ref)
        if (branch === defaultBranch) {
            this._setVersionToUse('v0.0.1')
            this._setCanPublishHelm(true)
        } else {
            this._setCanPublishHelm(false)
        }
    }

    async _validateTag({ tag, repo, owner, defaultBranch, commitId }) {

        if (!this.semver.isValid(tag)) {
            core.setFailed('[fmtok8s:CI] Invalid Semver')
            core.error('Error!')
        }

        const isFromDefaultBranch = await this.githubService.commitIsFromDefaultBranch({
            commitId,
            owner,
            repo,
            defaultBranch,
        })

        if (!isFromDefaultBranch) {
            core.setFailed(`[fmtok8s:CI] You can create a tag only from ${defaultBranch}`)
            core.error('Error!')
        }
    }

    _setVersionToUse(value) {
        core.setOutput('version_to_use', value)
    }

    _setCanPublishHelm(value) {
        core.setOutput('can_publish_helm', value)
    }
}

module.exports = Main