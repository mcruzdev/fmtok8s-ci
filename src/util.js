const REF_TAG_PREFIX = 'refs/tags/'

class Util {
    constructor() { }

    extractTag(ref = '') {
        if (ref.startsWith(REF_TAG_PREFIX)) {
            return ref.replace(REF_TAG_PREFIX, '')
        } else {
            return ''
        }
    }
}

module.exports = Util