import * as path from 'path';
import * as os from 'os';
import { execSync } from 'child_process';
import { runCommand } from '../../core';
import { createFixtures, tmpRootDir, tmpDir } from './fixtures';
import { outputInvalidRepo, outputInvalidConfig, outputInvalidTag } from './ouput';

const rootDir = path.join(tmpDir, 'curr');

beforeEach(() => {
  createFixtures();

  jest.spyOn(os, 'tmpdir').mockImplementation(() => tmpRootDir);
});

test('update:invalid:version', async () => {
  process.chdir(rootDir);
  execSync('npm pkg delete open-stack');
  const { code, output } = await runCommand('update', rootDir, '--files', '*.txt', '--raw');

  expect(output).toBe(outputInvalidConfig);
  expect(code).toBe(1);
});

test('update:invalid:repo', async () => {
  const { code, output } = await runCommand('update', rootDir, '--repository', 'invalid', '--files', '*.txt', '--raw');

  expect(output).toBe(outputInvalidRepo);
  expect(code).toBe(1);
});

test('update:invalid:tag', async () => {
  const { code, output } = await runCommand(
    'update',
    rootDir,
    '--from',
    'latest',
    '--to',
    '0.0.0',
    '--files',
    '*.txt',
    '--raw'
  );

  expect(output).toBe(outputInvalidTag);
  expect(code).toBe(1);
});
