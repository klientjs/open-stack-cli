"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tmpRootDir = void 0;
const os = require("os");
const path = require("path");
const config_1 = require("../../core/config");
const context_1 = require("../../core/context");
exports.tmpRootDir = path.join(os.tmpdir(), 'open-stack-cli');
const defaults = Object.assign(Object.assign({}, context_1.defaultInputs), { to: 'latest', from: '', report: '', dir: '.', repository: config_1.default.repository, dry: false, files: [
        '.github/ISSUE_TEMPLATE/*',
        '.github/workflows/*',
        '.github/PULL_REQUEST_TEMPLATE.md',
        '.release-it.json',
        '.eslintrc',
        '.prettierrc',
        '.editorconfig',
        '.gitignore',
        '.commitlintrc',
        'jest.config.ts',
        'tsconfig.json',
        'CODE_OF_CONDUCT.md',
        'CONTRIBUTING.md',
        'LICENCE'
    ] });
const createState = () => ({
    CONFLICT: [],
    ADDED: [],
    UPDATED: [],
    REMOVED: [],
    SKIPPED: []
});
const createContext = (inputs) => ({
    tmp: {
        root: exports.tmpRootDir,
        prev: path.join(exports.tmpRootDir, 'prev'),
        next: path.join(exports.tmpRootDir, 'next')
    },
    pkg: {},
    inputs: {
        dir: inputs.dir,
        from: inputs.from || defaults.from,
        to: inputs.to || defaults.to,
        repository: inputs.repository || defaults.repository,
        files: inputs.files || defaults.files,
        report: inputs.report,
        dry: inputs.dry
    },
    analyze: {
        files: createState(),
        package: {
            scripts: createState(),
            devDependencies: createState()
        },
        isFilesChanged: false,
        isPkgChanged: false,
        hasConflicts: false
    },
    prevVersion: '',
    nextVersion: ''
});
exports.default = createContext;
