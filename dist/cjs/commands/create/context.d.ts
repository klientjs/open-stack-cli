import type { Context as BaseContext, Inputs as BaseInputs } from '../../core/context';
export interface Inputs extends BaseInputs {
    dir: string;
    version: string;
    repository?: string;
}
export interface Context extends BaseContext {
    inputs: Inputs;
}
declare const createContext: (inputs: Inputs) => Context;
export default createContext;
