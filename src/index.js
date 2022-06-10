const core = require('@actions/core')
const github = require('@actions/github')

const Semver = require('./semver')
const Util = require('./util')
const Main = require('./main')
const GithubService = require('./github-service')

async function init() {

    // loads inputs
    const token = core.getInput('token')
    const defaultBranch = core.getInput('default_branch')

    // creates oktokit
    const oktokit = github.getOctokit(token)

    // constructs main
    const main = new Main({
        semver: new Semver(),
        util: new Util(),
        githubService: new GithubService({ oktokit })
    })

    await main.exec({
        commitId: github.context.payload?.head_commit?.id,
        defaultBranch,
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        ref: github.context.ref,
    })
}

init()