const Main = require('../src/main')
const Util = require('../src/util')
const Semver = require('../src/semver')

const GithubService = require('../src/github-service')

jest.mock('@actions/core')

describe('Main', () => {
    test('branchHandler when branch is not a default branch', () => {
        // arrange
        const main = new Main({
            util: new Util()
        })

        const setExecuteHelmPublishSpy = jest.spyOn(main, "setExecuteHelmPublish")
        const setVersionToUseSpy = jest.spyOn(main, "setVersionToUse")
        const setExecuteNativePublishSpy = jest.spyOn(main, "setExecuteNativePublish")

        // act
        main.branchHandler({
            ref: 'refs/heads/feature-v',
            defaultBranch: 'main'
        })

        // assert
        expect(setExecuteHelmPublishSpy).toHaveBeenCalledTimes(1)
        expect(setExecuteHelmPublishSpy).toHaveBeenCalledWith(false)

        expect(setVersionToUseSpy).toHaveBeenCalledTimes(1)
        expect(setVersionToUseSpy).toHaveBeenCalledWith('feature-v')

        expect(setExecuteNativePublishSpy).toHaveBeenCalledTimes(1)
        expect(setExecuteNativePublishSpy).toHaveBeenCalledWith(false)

    })

    test('branchHandler when branch is a default branch', () => {
        // arrange
        const main = new Main({
            util: new Util()
        })

        const setExecuteHelmPublishSpy = jest.spyOn(main, "setExecuteHelmPublish")
        const setVersionToUseSpy = jest.spyOn(main, "setVersionToUse")
        const setExecuteNativePublishSpy = jest.spyOn(main, "setExecuteNativePublish")

        // act
        main.branchHandler({
            ref: 'refs/heads/main',
            defaultBranch: 'main'
        })

        // assert
        expect(setExecuteHelmPublishSpy).toHaveBeenCalledTimes(0)
        expect(setVersionToUseSpy).toHaveBeenCalledTimes(0)
        expect(setExecuteNativePublishSpy).toHaveBeenCalledTimes(0)
    })

    test('tagHandler if the tag is invalid should set error', () => {
        // arrange

        const main = new Main({
            util: new Util(),
            githubService: new GithubService({ oktokit: {} }),
            semver: new Semver()
        })

        const setVersionToUseSpy = jest.spyOn(main, "setVersionToUse")
        const addInvalidSemverErrorSpy = jest.spyOn(main, "addInvalidSemverError")

        // act
        main.tagHandler({
            ref: 'refs/tags/va.b.c'
        })

        // assert
        expect(setVersionToUseSpy).toHaveBeenCalledTimes(0)
        expect(addInvalidSemverErrorSpy).toHaveBeenCalledTimes(1)
        expect(addInvalidSemverErrorSpy).toHaveBeenCalledWith()
    })

    test('tagHandler if the tag is valid and is not from default branch should set error', async () => {
        // arrange
        const main = new Main({
            util: new Util(),
            githubService: new GithubService({
                oktokit: {
                    request: jest.fn().mockResolvedValue({
                        data: { status: 'diff' }
                    })
                }
            }),
            semver: new Semver()
        })

        const setVersionToUseSpy = jest.spyOn(main, "setVersionToUse")
        const addTagOutDefaultBranchErrorSpy = jest.spyOn(main, "addTagOutDefaultBranchError")

        // act
        await main.tagHandler({
            ref: 'refs/tags/v1.1.1',
            defaultBranch: 'main'
        })

        // assert
        expect(setVersionToUseSpy).toHaveBeenCalledTimes(0)
        expect(addTagOutDefaultBranchErrorSpy).toHaveBeenCalledTimes(1)
        expect(addTagOutDefaultBranchErrorSpy).toHaveBeenCalledWith('main')
    })

    test('tagHandler if the tag is valid and is from default branch should set the version', async () => {
        // arrange
        const main = new Main({
            util: new Util(),
            githubService: new GithubService({
                oktokit: {
                    request: jest.fn().mockResolvedValue({
                        data: { status: 'identical' }
                    })
                }
            }),
            semver: new Semver()
        })

        const setVersionToUseSpy = jest.spyOn(main, "setVersionToUse")
        const addTagOutDefaultBranchErrorSpy = jest.spyOn(main, "addTagOutDefaultBranchError")

        // act
        await main.tagHandler({
            ref: 'refs/tags/v1.1.1',
            defaultBranch: 'main'
        })

        // assert
        expect(setVersionToUseSpy).toHaveBeenCalledTimes(1)
        expect(setVersionToUseSpy).toHaveBeenCalledWith('v1.1.1')
        expect(addTagOutDefaultBranchErrorSpy).toHaveBeenCalledTimes(0)
    })
})