import * as os from 'os';
import * as path from 'path';
import { defaultInputs } from '../../core/context';
export const tmpRootDir = path.join(os.tmpdir(), 'open-stack-cli');
const defaults = Object.assign(Object.assign({}, defaultInputs), { to: 'latest', from: '', report: '', dir: '.', repository: 'https://github.com/klientjs/open-stack.git', dry: false, files: [
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
        root: tmpRootDir,
        prev: path.join(tmpRootDir, 'prev'),
        next: path.join(tmpRootDir, 'next')
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
export default createContext;
