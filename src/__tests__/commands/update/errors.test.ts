import * as os from 'os';
import { execSync } from 'child_process';
import { runCommand } from '../../core';
import { moveTo } from '../../../core/process';
import { createFixtures, tmpRootDir, projectDir } from './fixtures';
import { outputInvalidRepo, outputInvalidConfig, outputInvalidTag } from './ouput';

beforeEach(() => {
  createFixtures();

  jest.spyOn(os, 'tmpdir').mockImplementation(() => tmpRootDir);
});

test('update:invalid:version', async () => {
  const backToPreviousDir = moveTo(projectDir);
  execSync('npm pkg delete open-stack');
  backToPreviousDir();

  const { code, output } = await runCommand('update', projectDir, '--files', '*.txt', '--raw');

  expect(output).toBe(outputInvalidConfig);
  expect(code).toBe(1);
});

test('update:invalid:repo', async () => {
  const { code, output } = await runCommand(
    'update',
    projectDir,
    '--repository',
    'invalid',
    '--files',
    '*.txt',
    '--raw'
  );

  expect(output).toBe(outputInvalidRepo);
  expect(code).toBe(1);
});

test('update:invalid:tag', async () => {
  const { code, output } = await runCommand(
    'update',
    projectDir,
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
