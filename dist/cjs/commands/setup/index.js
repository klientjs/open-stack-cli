"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedLibs = void 0;
const context_1 = require("./context");
const experimental_1 = require("./middlewares/experimental");
const react_app_1 = require("./middlewares/react-app");
const react_1 = require("./middlewares/react");
var context_2 = require("./context");
Object.defineProperty(exports, "supportedLibs", { enumerable: true, get: function () { return context_2.supportedLibs; } });
exports.default = {
    createContext: context_1.default,
    process: [experimental_1.default, react_app_1.default, react_1.default]
};
