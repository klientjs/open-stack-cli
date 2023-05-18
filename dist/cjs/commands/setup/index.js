"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const experimental_1 = require("./middlewares/experimental");
const react_app_1 = require("./middlewares/react-app");
exports.default = {
    createContext: context_1.default,
    process: [experimental_1.default, react_app_1.default]
};
