const core = require('@actions/core')
const github = require('@actions/github')

var regex = new RegExp('(0|[1-9]\d*)+\.(0|[1-9]\d*)+\.(0|[1-9]\d*)+(-(([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*)(\.([a-z-][\da-z-]+|[\da-z-]+[a-z-][\da-z-]*|0|[1-9]\d*))*))?(\\+([\da-z-]+(\.[\da-z-]+)*))?$')

async function setup() {
    core.setFailed('failing')
}

setup()