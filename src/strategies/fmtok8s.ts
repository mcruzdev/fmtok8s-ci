import {Output} from '../interfaces/output';
import {StrategyInput} from '../interfaces/strategy-input';
import {Strategy} from './strategy';
import {
  CreateTagIsNotAllowed,
  InvalidSemverError,
}
  from '../exceptions/exceptions';
import {GitService} from '../services/git-service';
import {DEFAULT_BRANCH} from '../input-values';

export class FromMonolithToKubernetesStrategy implements Strategy {
  output: Output = {
    executeDockerPublish: true,
    executeHelmPublish: true,
    executeNativePublish: true,
    versionToUse: 'v0.0.1',
  };


  constructor(private input: StrategyInput, private gitService: GitService) { }

  async execute(): Promise<Output> {
    if (this.input.tag != null) {
      await this.handleTag();
    } else {
      this.handleBranch();
    }
    return this.output;
  }

  async handleTag() {
    const {tag} = this.input;

    if (!tag.valid) {
      throw new InvalidSemverError('Invalid semver');
    }

    // On this strategy the tag is only created on default branch
    if (await this.gitService.commitIsFromBranch(DEFAULT_BRANCH)) {
      this.output.versionToUse = this.input.tag.value;
    } else {
      throw new CreateTagIsNotAllowed(
          `This strategy is not allows to create a tag on this branch`);
    }
  }

  handleBranch() {
    const {branch} = this.input;

    if (branch.name !== DEFAULT_BRANCH) {
      this.output.executeHelmPublish = false;
      this.output.executeNativePublish = false;
      this.output.versionToUse = branch.name;
    }
  }
}
