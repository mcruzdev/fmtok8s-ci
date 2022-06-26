export interface GitService {
    commitIsFromBranch(branchName: string): Promise<boolean>
}
