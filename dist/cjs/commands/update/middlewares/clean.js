"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
exports.default = ({ tmp }) => {
    if (fs.existsSync(tmp.root)) {
        fs.rmSync(tmp.root, { recursive: true, force: true });
    }
};
