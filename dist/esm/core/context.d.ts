import Logger from './logger';
import type { Command } from './command';
export declare type Inputs = {
    verbose: boolean;
    silent: boolean;
    raw: boolean;
};
export interface Context {
    logger: Logger;
    inputs: Inputs;
}
export declare const defaultInputs: Inputs;
export declare const createContext: ({ verbose, silent, raw }: Inputs) => Context;
export default function buildContext<T extends Context = Context>(command: Command<T>, args: Inputs): T;
