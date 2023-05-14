import * as path from 'path';
import * as fs from 'fs';
import { tmpdir } from 'os';
import { execSync } from 'child_process';

export const rootDir = path.join(tmpdir(), 'open-stack-test-configure');

const initialDir = process.cwd();

export const createNewProject = () => {
  // Clear previous content
  fs.rmSync(rootDir, { recursive: true, force: true });

  // Initialize fake project folders
  fs.mkdirSync(rootDir);
  fs.mkdirSync(path.join(rootDir, 'docs'));

  // Initialize updatable files
  ['package.json', 'README.md', 'LICENCE'].forEach((file) => {
    fs.copyFileSync(file, path.join(rootDir, file));
  });

  // Initialize git folder
  process.chdir(rootDir);
  execSync(`git init && git remote add origin https://github.com/example/repo.git`);
  process.chdir(initialDir);
};
