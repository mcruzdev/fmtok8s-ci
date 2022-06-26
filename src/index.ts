import {BRANCH_NAME, STRATEGY, TAG_VALUE} from './input-values';
import {StrategyInput} from './interfaces/strategy-input';
import {Tag} from './models/tag';
import {GithubService} from './services/impl/github-service';
import {FromMonolithToKubernetesStrategy} from './strategies/fmtok8s';
import core from '@actions/core';

const makeInput = (): StrategyInput => {
  const {valid, value} = new Tag(TAG_VALUE);
  return {
    branch: {
      name: BRANCH_NAME,
    },
    tag: {
      value,
      valid,
    },
  };
};


const makeFromMonolithToKubernetes = () => {
  return async () => {
    core.info('Running From Monolith To Kubernetes Strategy');
    const strategy = new FromMonolithToKubernetesStrategy(makeInput(), new GithubService());
    await strategy.execute();
  };
};

const strategies: any = {
  'fmtok8s': makeFromMonolithToKubernetes(),
};

async function run() {
  const strategy = strategies[STRATEGY];
  await strategy();
}

run();
