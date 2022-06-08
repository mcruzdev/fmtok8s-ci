const core = require('@actions/core')
const github = require('@actions/github')

var regex = new RegExp('(0|[1-9]\d*)+\.(0|[1-9]\d*)+\.(0|[1-9]\d*)+(-(([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*)(\.([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*))*))?(\\+([\da-z-]+(\.[\da-z-]+)*))?$')

async function setup() {
    const { ref } = github.context
    core.info(`ref: ${ref}`)
    if (!regex.exec(tag)) {
        core.setFailed('[fmtok8s-ci-action]: Invalid semver')
    }
}

setup()