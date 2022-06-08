const core = require('@actions/core')
const github = require('@actions/github')
const { valid, gt } = require('semver')

var regex = new RegExp('(0|[1-9]\d*)+\.(0|[1-9]\d*)+\.(0|[1-9]\d*)+(-(([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*)(\.([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*))*))?(\\+([\da-z-]+(\.[\da-z-]+)*))?$')

const tagsPrefix = 'refs/tags/v'
const headsPrefix = 'refs/heads/'
const tagStart = 10
const branchStart = 10
const defaultBranch = core.getInput('default-branch')

function validateRef() {
    const { ref } = github.context
    if (!ref.startsWith(tagsPrefix)) {
        core.setFailed('[validateRef]: This action accepts only tag')
    }
}

function validateTag() {
    const { ref } = github.context
    const tag = ref.substring(tagStart)
    console.log('[validateTag]: tag ', tag)

    if (!regex.exec(tag)) {
        core.setFailed('[validateTag]: Invalid semver')
    }
}

function validateBranch() {
    const { ref } = github.context
    const branchName = ref.substring(branchStart)

    console.log('[validateBranch]: branch ', branchName)

    if (branchName !== defaultBranch) {
        core.setFailed('[validateBranch]: This action runs just on default branch')
    }
}

async function getLatestTag() {
    const token = core.getInput('github_token')
    const oktokit = github.getOctokit(token)

    const tags = await oktokit.rest.repos.listTags({
        repo: process.env.GITHUB_REPOSITORY,
        per_page: 100,
        owner: github.context.repo.owner,
    })

    return tags.data.map(tag => tag.name).reduce((a, b) => {
        return gt(a, b) ? a : b
    })
}

async function main() {

    if (github.context.ref.startsWith(headsPrefix)) {
        validateBranch()
        const latest = await getLatestTag()
        console.log('[main]: Latest tag: ', latest)
    }

    if (github.context.ref.startsWith(tagsPrefix)) {
        validateRef()
        validateTag()
    }
}

main()
