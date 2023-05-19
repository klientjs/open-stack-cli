import * as path from 'path';
import * as fs from 'fs';
import { tmpdir } from 'os';
import { execSync } from 'child_process';

export const rootDir = path.join(tmpdir(), 'open-stack-test-setup');

export const removeRootDir = () => fs.rmSync(rootDir, { force: true, recursive: true });

export const createNewProject = () => {
  const responses = {
    name: '@klient/example',
    description: 'Example description',
    repository: 'https://github.com/klientjs/example',
    keywords: 'example test klient',
    owner: 'klientjstest'
  };

  jest.mock('prompts', () => () => Promise.resolve(responses));

  if (fs.existsSync(rootDir)) {
    const currDir = process.cwd();
    process.chdir(rootDir);
    execSync('git checkout . && git clean -df');
    process.chdir(currDir);
  } else {
    execSync(`node dist/cjs/cli.js create ${rootDir}`);
  }
};
