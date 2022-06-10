const GithubService = require("../src/github-service");

describe('GithubService', () => {
    test('commitIsFromDefaultBranch: when there is error should return false', async () => {

        // arrange
        const githubService = new GithubService({
            oktokit: {
                request: jest.fn().mockImplementation(() => { throw new Error() })
            }
        })
        // act
        const result = await githubService.commitIsFromDefaultBranch({ commitId: 'abc' })

        // assert
        expect(result).toBe(false)
    })
})