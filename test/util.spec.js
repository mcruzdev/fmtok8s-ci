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
})