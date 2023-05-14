"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const create_1 = require("./middlewares/create");
exports.default = {
    createContext: context_1.default,
    process: [create_1.default]
};
