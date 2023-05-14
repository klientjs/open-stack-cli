import type { Context as BaseContext, Inputs as BaseInputs } from '../../core/context';

export interface Inputs extends BaseInputs {
  output: string;
  input: string;
  label: string;
}

export interface Context extends BaseContext {
  inputs: Inputs;
}

const createContext = (inputs: Inputs): Context => ({ inputs } as Context);

export default createContext;
