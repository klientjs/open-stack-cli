import type { Context as BaseContext, Inputs as BaseInputs } from '../../core/context';

export interface Inputs extends BaseInputs {
  dir: string;
  lib: string;
}

export interface Context extends BaseContext {
  inputs: Inputs;
}

export const supportedLibs = ['react-app', 'react'];

const createContext = (inputs: Inputs): Context => ({ inputs } as Context);

export default createContext;
