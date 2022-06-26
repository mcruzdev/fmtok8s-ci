import github from '@actions/github';
import {GITHUB_TOKEN} from '../input-values';

export default github.getOctokit(GITHUB_TOKEN);
