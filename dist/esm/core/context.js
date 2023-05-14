import * as deepmerge from 'deepmerge';
import Logger from './logger';
export const defaultInputs = {
    verbose: false,
    silent: false,
    raw: false
};
export const createContext = ({ verbose, silent, raw }) => ({
    logger: new Logger(1 + +verbose - +silent, !raw),
    inputs: { verbose, silent, raw }
});
export default function buildContext(command, args) {
    return deepmerge(createContext(args), command.createContext(args), {
        arrayMerge: (_destinationArray, sourceArray) => sourceArray,
        isMergeableObject: (o) => (o === null || o === void 0 ? void 0 : o.constructor) === Array || (o === null || o === void 0 ? void 0 : o.constructor) === Object
    });
}
