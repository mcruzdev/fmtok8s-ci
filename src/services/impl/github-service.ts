import {GitService} from '../git-service';
import oktokit from '../../oktokit/oktokit';
import {COMMIT_ID, OWNER, REPO} from '../../input-values';

export class GithubService implements GitService {
  async commitIsFromBranch(branchName: string): Promise<boolean> {
    try {
      const response = await oktokit
          .request(`GET /repos/{owner}/{repo}/compare/{base}...{head}`, {
            owner: OWNER,
            repo: REPO,
            base: branchName,
            head: COMMIT_ID,
          });
      return response.data.status === 'identical' ||
                response.data.status === 'behind';
    } catch (err) {
      return false;
    }
  }
}
