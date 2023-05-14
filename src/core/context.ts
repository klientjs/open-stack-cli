import * as deepmerge from 'deepmerge';

import Logger from './logger';

import type { Command } from './command';

export type Inputs = {
  verbose: boolean;
  silent: boolean;
  raw: boolean;
};

export interface Context {
  logger: Logger;
  inputs: Inputs;
}

export const defaultInputs: Inputs = {
  verbose: false,
  silent: false,
  raw: false
};

export const createContext = ({ verbose, silent, raw }: Inputs): Context => ({
  logger: new Logger(1 + +verbose - +silent, !raw),
  inputs: { verbose, silent, raw }
});

export default function buildContext<T extends Context = Context>(command: Command<T>, args: Inputs): T {
  return deepmerge<Context, T>(createContext(args), command.createContext(args), {
    // Replacing array with next value
    arrayMerge: (_destinationArray: unknown[], sourceArray: unknown[]) => sourceArray,
    // Merge only array & plain object
    isMergeableObject: (o: object) => o?.constructor === Array || o?.constructor === Object
  });
}
