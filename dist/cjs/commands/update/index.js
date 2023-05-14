"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const context_1 = require("./context");
const init_1 = require("./middlewares/init");
const repository_1 = require("./middlewares/repository");
const analyze_1 = require("./middlewares/analyze");
const result_1 = require("./middlewares/result");
const write_1 = require("./middlewares/write");
const report_1 = require("./middlewares/report");
const clean_1 = require("./middlewares/clean");
const success_1 = require("./middlewares/success");
exports.default = {
    createContext: context_1.default,
    process: [init_1.default, repository_1.default, analyze_1.default, result_1.default, write_1.default, report_1.default, success_1.default],
    postProcess: [clean_1.default]
};
