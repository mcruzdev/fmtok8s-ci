const core = require('@actions/core')
const github = require('@actions/github')

const Semver = require('./Semver')
const Util = require('./Util')
const Main = require('./Main')

function init() {
    const main = new Main({
        semver: new Semver(),
        util: new Util(),
    })
    main.exec({ context: github.context, core: core })
}

init()