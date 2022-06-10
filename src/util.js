const REF_TAG_PREFIX = 'refs/tags/'
const REF_BRANCH_PREFIX = 'refs/heads/'

class Util {
    constructor() { }

    extractTag(ref = '') {
        if (ref.startsWith(REF_TAG_PREFIX)) {
            return ref.replace(REF_TAG_PREFIX, '')
        } else {
            return ''
        }
    }

    extractBranch(ref = '') {
        if (ref.startsWith(REF_BRANCH_PREFIX)) {
            return ref.replace(REF_BRANCH_PREFIX, '')
        } else {
            return ''
        }
    }
}

module.exports = Util