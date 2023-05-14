import type { Context as BaseContext, Inputs as BaseInputs } from '../../core/context';
export interface Inputs extends BaseInputs {
    to: string;
    report: string;
    from: string;
    repository: string;
    files: string[];
    dry: boolean;
    dir: string;
}
export declare type State = {
    ADDED: string[];
    UPDATED: string[];
    REMOVED: string[];
    SKIPPED: string[];
    CONFLICT: string[];
};
export declare type Pkg = Record<string, Record<string, string[]>>;
export declare type Files = Record<string, string[]>;
export interface Context extends BaseContext {
    tmp: Record<string, string>;
    pkg: Record<string, unknown>;
    inputs: Inputs;
    analyze: {
        files: State;
        package: {
            scripts: State;
            devDependencies: State;
        };
        isFilesChanged: boolean;
        isPkgChanged: boolean;
        hasConflicts: boolean;
    };
    prevVersion: string;
    nextVersion: string;
}
export declare const tmpRootDir: string;
declare const createContext: (inputs: Inputs) => Context;
export default createContext;
