const Semver = require("../src/Semver");

describe('Semver', () => {
    test('When tag is valid should return true', () => {
        // arrange
        const semver = new Semver()

        // act
        const isValid = semver.isValid('v0.0.1')

        // assert
        expect(isValid).toBeTruthy()
    })

    test('When tag is invalid should return false', () => {
        // arrange
        const semver = new Semver()

        // act
        const isValid = semver.isValid('a.b.c')

        // assert
        expect(isValid).toBe(false)
    })
})