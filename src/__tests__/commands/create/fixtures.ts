import * as path from 'path';
import * as fs from 'fs';
import { tmpdir } from 'os';

export const configurationResponse = {
  name: '@klient/example',
  description: 'Example description',
  repository: 'https://github.com/klientjs/example',
  keywords: 'example test klient',
  owner: 'klientjstest'
};

export const projectDir = path.join(tmpdir(), 'open-stack-create');

export const createFixtures = () => {
  fs.rmSync(projectDir, { force: true, recursive: true });
  fs.mkdirSync(projectDir);
};
