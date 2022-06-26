const Util = require("../src/util");

describe('Util', () => {
    test('Should return a valid tag from ref', () => {
        // arrange
        const util = new Util()

        // act
        const tag = util.extractTag('refs/tags/v0.0.1')

        // assert
        expect(tag).toBe('v0.0.1')
    })

    test('Should return empty string when tag ref is not a tag ref', () => {
        // arrange
        const util = new Util()

        // act
        const tag = util.extractTag('refs/heads/feature')


        // assert
        expect(tag).toBe('')
    })

    test('Should return a branch from ref', () => {
        // arrange
        const util = new Util()

        // act
        const branch = util.extractBranch('refs/heads/feature')

        // assert
        expect(branch).toBe('feature')
    })

    test('Should return empty string when branch ref is not a branch ref', () => {
        // arrange
        const util = new Util()

        // act
        const tag = util.extractBranch('refs/tags/feature')


        // assert
        expect(tag).toBe('')
    })

    test('Should return true if is a tag', () => {
        // arrange
        const util = new Util()
        // act
        const is = util.isTag('v0.1.1')

        // assert
        expect(is).toBe(true)
    })

    test('Should return false if is not a tag', () => {
        // arrange
        const util = new Util()

        // act
        const is = util.isTag('va.b.c-semver')

        // assert
        expect(is).toBe(false)
    })
})