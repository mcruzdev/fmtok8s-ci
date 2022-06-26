import core from '@actions/core';
import github from '@actions/github';

const REF_BRANCH_PREFIX = 'refs/heads/';
const REF_TAG_PREFIX = 'refs/tags/';

// input
export const GITHUB_TOKEN = core.getInput('github_token');
export const DEFAULT_BRANCH = core.getInput('default_branch');
export const STRATEGY: string = core.getInput('strategy');

// context
export const OWNER = github.context.repo.owner;
export const REPO = github.context.repo.repo;
export const COMMIT_ID = github.context.payload?.head_commit?.id;
export const REF = github.context.ref;

export const BRANCH_NAME = (() =>
    REF.startsWith(REF_BRANCH_PREFIX) ? REF.replace(REF_BRANCH_PREFIX, '') : '')();

export const TAG_VALUE = (() =>
    REF.startsWith(REF_TAG_PREFIX) ? REF.replace(REF_TAG_PREFIX, '') : '')();


