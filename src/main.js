const core = require('@actions/core')

class Main {
    constructor({ semver, util, githubService }) {
        this.semver = semver
        this.util = util
        this.githubService = githubService
    }

    async exec({ ref, repo, owner, defaultBranch, commitId }) {

        this.setExecuteDockerPublish(true)
        this.setExecuteHelmPublish(true)
        this.setVersionToUse('v0.0.1')
        this.setExecuteNativePublish(true)

        const tag = this.util.extractTag(ref)
        const isTag = this.util.isTag(tag)
        
        if (isTag) {
            await this.tagHandler({ ref, repo, owner, defaultBranch, commitId })
        } else {
            this.branchHandler({ ref, defaultBranch })
        }
    }

    branchHandler({ ref, defaultBranch }) {
        const branch = this.util.extractBranch(ref)
        if (branch !== defaultBranch) {
            this.setExecuteHelmPublish(false)
            this.setVersionToUse(branch)
            this.setExecuteNativePublish(false)
        }
    }

    async tagHandler({ ref, repo, owner, defaultBranch, commitId }) {

        const tag = this.util.extractTag(ref)

        if (!this.semver.isValid(tag)) {
            this.addInvalidSemverError()
            return
        }

        const isFromDefaultBranch = await this.githubService.commitIsFromDefaultBranch({
            commitId,
            owner,
            repo,
            defaultBranch,
        })

        if (!isFromDefaultBranch) {
            this.addTagOutDefaultBranchError(defaultBranch)
            return
        }

        this.setVersionToUse(tag)
    }

    addInvalidSemverError() {
        core.setFailed('[fmtok8s:CI] Invalid Semver')
        core.error('Error!')
    }

    addTagOutDefaultBranchError(defaultBranch) {
        core.setFailed(`[fmtok8s:CI] You can create a tag only from ${defaultBranch}`)
        core.error('Error!')
    }

    setVersionToUse(value) {
        core.info('Setting version_to_use ', value)
        core.setOutput('version_to_use', value)
    }

    setExecuteHelmPublish(value) {
        core.info('Setting execute_helm_publish ', value)
        core.setOutput('execute_helm_publish', value)
    }

    setExecuteDockerPublish(value) {
        core.info('Setting execute_docker_publish ', value)
        core.setOutput('execute_docker_publish', value)
    }

    setExecuteNativePublish(value) {
        core.info('Setting execute_native_publish', value)
        core.setOutput('execute_native_publish', value)
    }
}

module.exports = Main