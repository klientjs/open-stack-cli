export declare const cloneRepository: (repository: string, tag: string, dir: string) => string;
export declare const sourceRepositoryToUrl: (repo?: string | undefined) => string;
export declare const httpToSshOriginUrl: (repo: string) => string;
export declare const getCurrentBranchName: () => string;
export declare const commit: (message: string) => void;
