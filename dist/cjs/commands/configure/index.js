"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const configure_1 = require("./middlewares/configure");
exports.default = {
    createContext: context_1.default,
    process: [configure_1.default]
};
