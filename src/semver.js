
const semver = require('semver')

class Semver {
    constructor() { }

    isValid(tag) {
        return !!semver.valid(tag)
    }
}

module.exports = Semver