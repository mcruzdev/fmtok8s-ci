const core = require('@actions/core')

class Main {
    constructor({ semver, util }) {
        this.semver = semver;
        this.util = util;
    }

    exec({ context, core }) {
        const ref = this.util.extractRef(context)
        const isValid = this.semver.isValid(ref)
        if (isValid) {
            core.setFailed('[fmtok8s:CI] Invalid Semver')
        }
    }
}

module.exports = Main