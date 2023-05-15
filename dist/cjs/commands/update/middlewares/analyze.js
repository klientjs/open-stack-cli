"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const glob_1 = require("glob");
const compare = (prev, curr, next) => {
    if (prev === next || curr === next) {
        return 'SKIPPED';
    }
    if (curr !== prev) {
        return 'CONFLICT';
    }
    if (!prev && next) {
        return 'ADDED';
    }
    if (prev && !next) {
        return 'REMOVED';
    }
    return 'UPDATED';
};
const analyzePackageFile = (_a) => {
    var { tmp, analyze } = _a, rest = __rest(_a, ["tmp", "analyze"]);
    const prev = JSON.parse(fs.readFileSync(path.join(tmp.prev, 'package.json')).toString());
    const next = JSON.parse(fs.readFileSync(path.join(tmp.next, 'package.json')).toString());
    const curr = rest.pkg;
    const pkg = analyze.package;
    Object.keys(pkg).forEach((section) => {
        Object.keys(prev[section]).forEach((key) => {
            var _a;
            const prevVal = prev[section][key];
            const nextVal = next[section][key];
            const currVal = (_a = curr[section]) === null || _a === void 0 ? void 0 : _a[key];
            const status = compare(prevVal, currVal, nextVal);
            if (status === 'CONFLICT' || status === 'REMOVED') {
                pkg[section][status].push(key);
                analyze.isPkgChanged = true;
                analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
            }
        });
        Object.keys(next[section]).forEach((key) => {
            var _a;
            const nextVal = next[section][key];
            const prevVal = prev[section][key];
            const currVal = (_a = curr[section]) === null || _a === void 0 ? void 0 : _a[key];
            const status = compare(prevVal, currVal, nextVal);
            if (!pkg[section][status].includes(key)) {
                pkg[section][status].push(key);
                analyze.isPkgChanged = status !== 'SKIPPED' || analyze.isPkgChanged;
                analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
            }
        });
    });
};
const exists = (p) => fs.existsSync(p);
const read = (p) => fs.readFileSync(p).toString();
const analyzeFiles = ({ inputs, tmp, analyze }) => {
    const { files } = analyze;
    (0, glob_1.globSync)(inputs.files.map((file) => path.join(tmp.prev, file))).forEach((prevFile) => {
        const realPath = prevFile.replace(`${tmp.prev}/`, '');
        const nextPath = path.join(tmp.next, realPath);
        const currPath = path.join(process.cwd(), realPath);
        const prevVal = read(prevFile);
        const nextVal = exists(nextPath) ? read(nextPath) : undefined;
        const currVal = exists(currPath) ? read(currPath) : undefined;
        const status = compare(prevVal, currVal, nextVal);
        if (status === 'CONFLICT' || status === 'REMOVED') {
            files[status].push(realPath);
            analyze.isFilesChanged = true;
            analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
        }
    });
    (0, glob_1.globSync)(inputs.files.map((file) => path.join(tmp.next, file))).forEach((nextFile) => {
        const realPath = nextFile.replace(`${tmp.next}/`, '');
        const prevPath = path.join(tmp.prev, realPath);
        const currPath = path.join(process.cwd(), realPath);
        const nextVal = read(nextFile);
        const prevVal = exists(prevPath) ? read(prevPath) : undefined;
        const currVal = exists(currPath) ? read(currPath) : undefined;
        const status = compare(prevVal, currVal, nextVal);
        if (!files[status].includes(realPath)) {
            files[status].push(realPath);
            analyze.isFilesChanged = status !== 'SKIPPED' || analyze.isFilesChanged;
            analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
        }
    });
};
exports.default = (context) => {
    const { logger, inputs, analyze } = context;
    logger.step('Analyze project');
    logger.info('Compare package.json', 2);
    logger.info('', 2);
    Object.keys(analyze.package).forEach((section) => logger.info(`  - ${section}`, 2));
    logger.info('', 2);
    analyzePackageFile(context);
    logger.info('Compare files corresponding to globs below', 2);
    logger.info('', 2);
    inputs.files.forEach((file) => logger.info(`  - ${file}`, 2));
    logger.info('', 2);
    analyzeFiles(context);
};
