import * as os from 'os';
import * as path from 'path';

import config from '../../core/config';
import { defaultInputs } from '../../core/context';

import type { Context as BaseContext, Inputs as BaseInputs } from '../../core/context';

export interface Inputs extends BaseInputs {
  to: string;
  report: string;
  from: string;
  repository: string;
  files: string[];
  dry: boolean;
  dir: string;
}

export type State = {
  ADDED: string[];
  UPDATED: string[];
  REMOVED: string[];
  SKIPPED: string[];
  CONFLICT: string[];
};

export type Pkg = Record<string, Record<string, string[]>>;
export type Files = Record<string, string[]>;

export interface Context extends BaseContext {
  tmp: Record<string, string>;
  pkg: Record<string, unknown>;
  inputs: Inputs;
  analyze: {
    files: State;
    package: {
      scripts: State;
      devDependencies: State;
    };
    isFilesChanged: boolean;
    isPkgChanged: boolean;
    hasConflicts: boolean;
  };
  prevVersion: string;
  nextVersion: string;
}

export const tmpRootDir = path.join(os.tmpdir(), 'open-stack-cli');

const defaults: Inputs = {
  ...defaultInputs,
  to: 'latest',
  from: '',
  report: '',
  dir: '.',
  repository: config.repository,
  dry: false,
  files: [
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
    'jest.config.json',
    'tsconfig.json',
    'CODE_OF_CONDUCT.md',
    'CONTRIBUTING.md',
    'LICENCE'
  ]
};

const createState = (): State => ({
  CONFLICT: [],
  ADDED: [],
  UPDATED: [],
  REMOVED: [],
  SKIPPED: []
});

const createContext = (inputs: Inputs): Context =>
  ({
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
  } as unknown as Context);

export default createContext;
