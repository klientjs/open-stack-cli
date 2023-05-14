"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetCwd = exports.moveTo = exports.chdir = void 0;
const fs = require("fs");
const initialCwd = process.env.PWD;
const chdir = (dir) => {
    if (fs.existsSync(dir)) {
        process.chdir(dir);
        process.cwd();
    }
};
exports.chdir = chdir;
const moveTo = (dir) => {
    if (dir === '.') {
        return () => undefined;
    }
    const previousDir = process.cwd();
    (0, exports.chdir)(dir);
    return () => (0, exports.chdir)(previousDir);
};
exports.moveTo = moveTo;
const resetCwd = () => (0, exports.chdir)(initialCwd);
exports.resetCwd = resetCwd;
