const core = require('@actions/core')
const github = require('@actions/github')

var regex = new RegExp('(0|[1-9]\d*)+\.(0|[1-9]\d*)+\.(0|[1-9]\d*)+(-(([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*)(\.([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*))*))?(\\+([\da-z-]+(\.[\da-z-]+)*))?$')

const tagPrefix = 'refs/tags/v'
const tagStart = 10

function validateRef() {
    const { ref } = github.context
    if (!ref.startsWith(tagPrefix)) {
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

async function main() {
    const ctx = JSON.stringify(github.context)
    console.log('ctx: ')
    console.log(ctx)
    validateRef()
    validateTag()
}

main()
