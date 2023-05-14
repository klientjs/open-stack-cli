"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = exports.defaultInputs = void 0;
const deepmerge = require("deepmerge");
const logger_1 = require("./logger");
exports.defaultInputs = {
    verbose: false,
    silent: false,
    raw: false
};
const createContext = ({ verbose, silent, raw }) => ({
    logger: new logger_1.default(1 + +verbose - +silent, !raw),
    inputs: { verbose, silent, raw }
});
exports.createContext = createContext;
function buildContext(command, args) {
    return deepmerge((0, exports.createContext)(args), command.createContext(args), {
        arrayMerge: (_destinationArray, sourceArray) => sourceArray,
        isMergeableObject: (o) => (o === null || o === void 0 ? void 0 : o.constructor) === Array || (o === null || o === void 0 ? void 0 : o.constructor) === Object
    });
}
exports.default = buildContext;
