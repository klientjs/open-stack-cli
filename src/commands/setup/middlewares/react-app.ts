import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
import { tmpdir } from 'os';

import type { Context } from '../context';

const reactScriptVersion = '5.0.1';

const reactDir = path.join(tmpdir(), 'react-app');

const pkg: Record<string, Record<string, string>> = {
  dependencies: {
    react: '^18.2.0',
    'react-dom': '^18.2.0',
    'web-vitals': '^2.1.4'
  },
  devDependencies: {
    '@testing-library/jest-dom': '^5.16.5',
    '@testing-library/react': '^13.4.0',
    '@testing-library/user-event': '^13.5.0',
    '@types/react': '^18.2.6',
    '@types/react-dom': '^18.2.4',
    'eslint-config-airbnb': '^19.0.4',
    'react-scripts': reactScriptVersion
  },
  scripts: {
    start: 'react-scripts start',
    build: 'rm -rf dist/* && BUILD_PATH=dist react-scripts build',
    test: 'react-scripts test --coverage --coverageReporters json-summary lcov text text-summary --watchAll=false --passWithNoTests',
    eject: 'react-scripts eject',
    dist: 'npm run build'
  },
  browserslist: {
    'production.0': '>0.2%',
    'production.1': 'not dead',
    'production.2': 'not op_mini all',
    'development.0': 'last 1 chrome version',
    'development.1': 'last 1 firefox version',
    'development.2': 'last 1 safari version'
  }
};

const removablePkgKeys = [
  'devDependencies.eslint-config-airbnb-base',
  'main',
  'types',
  'module',
  'files',
  'repository',
  'keywords'
];

const eslintConfigExtends = [
  'eslint:recommended',
  'plugin:@typescript-eslint/recommended',
  'react-app',
  'react-app/jest',
  'airbnb',
  'airbnb-typescript',
  'prettier'
];

const updateTsConfig = () => {
  const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json').toString());

  delete tsconfig.compilerOptions.baseUrl;
  delete tsconfig.compilerOptions.outDir;
  delete tsconfig.compilerOptions.declaration;

  tsconfig.compilerOptions.target = 'es5';
  tsconfig.compilerOptions.lib = ['dom', 'dom.iterable', 'esnext'];
  tsconfig.compilerOptions.allowJs = true;
  tsconfig.compilerOptions.skipLibCheck = true;
  tsconfig.compilerOptions.esModuleInterop = true;
  tsconfig.compilerOptions.allowSyntheticDefaultImports = true;
  tsconfig.compilerOptions.forceConsistentCasingInFileNames = true;
  tsconfig.compilerOptions.noFallthroughCasesInSwitch = true;
  tsconfig.compilerOptions.module = 'esnext';
  tsconfig.compilerOptions.moduleResolution = 'node';
  tsconfig.compilerOptions.resolveJsonModule = true;
  tsconfig.compilerOptions.isolatedModules = true;
  tsconfig.compilerOptions.noEmit = true;
  tsconfig.compilerOptions.jsx = 'react';

  fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));
};

export default async (context: Context) => {
  const { logger, inputs } = context;
  const { dir, lib } = inputs;

  if (lib !== 'react-app') {
    return;
  }

  if (dir !== '.') {
    logger.step('Move to target dir');
    process.chdir(dir);
    logger.info(`Moved to ${dir}`, 2);
  }

  logger.step('Update package.json');

  removablePkgKeys.forEach((key) => execSync(`npm pkg delete ${key}`));

  Object.keys(pkg).forEach((section) => {
    logger.info(`Setup ${section}`, 2);

    Object.keys(pkg[section]).forEach((key) => {
      execSync(`npm pkg set ${section}.${key}="${pkg[section][key]}"`);
    });
  });

  logger.step('Update files');

  logger.info('Update .gitignore', 2);
  let gitignore = fs.readFileSync('.gitignore').toString();

  gitignore += `\ndist\n`;

  fs.writeFileSync('.gitignore', gitignore);

  logger.info('Update .eslintrc', 2);

  const config = JSON.parse(fs.readFileSync('.eslintrc').toString());

  config.extends = eslintConfigExtends;
  config.rules['import/extensions'] = 'off';

  fs.writeFileSync('.eslintrc', JSON.stringify(config, null, 2));

  logger.info('Update tsconfig.json', 2);
  updateTsConfig();

  logger.info('Remove jest.config.json', 2);
  fs.rmSync('jest.config.json');

  logger.step('Install dependencies');

  execSync('npm install');

  logger.step('Create src and public folders');

  fs.rmSync(reactDir, { recursive: true, force: true });

  execSync('npm install --save-dev create-react-app');
  execSync(`npx create-react-app ${reactDir} --template typescript --scripts-version ${reactScriptVersion}`);
  execSync('npm remove create-react-app');

  fs.rmSync('src', { recursive: true, force: true });
  fs.cpSync(path.join(reactDir, 'src'), 'src', { recursive: true, force: true });

  fs.rmSync('public', { recursive: true, force: true });
  fs.cpSync(path.join(reactDir, 'public'), 'public', { recursive: true, force: true });

  logger.step('Update react files');

  const setupTests = fs
    .readFileSync('src/setupTests.ts')
    .toString()
    .replace(
      "import '@testing-library/jest-dom';",
      "// eslint-disable-next-line import/no-extraneous-dependencies\nimport '@testing-library/jest-dom';"
    );

  fs.writeFileSync('src/setupTests.ts', setupTests);

  logger.step('Cleaning unuseful files');

  fs.rmSync('.github/workflows/publish.yml');
  fs.rmSync('.github/workflows/unpublish.yml');

  fs.rmSync(reactDir, { recursive: true });

  logger.step('Run pre-commit script');
  execSync('npm run pre-commit');

  execSync('npm pkg set open-stack.setup=react-app');

  logger.success('Successfully setup');
};
