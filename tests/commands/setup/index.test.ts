import { runCommand } from '../../core';
import { createNewProject, rootDir } from './fixtures';
import { outputVerbose, outputSimple, outputInvalid } from './ouput';

beforeEach(() => {
  createNewProject();
});

test('setup:react-app', async () => {
  const { code, output } = await runCommand('setup', 'react-app', rootDir, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});

test('setup:react-app:verbose', async () => {
  const { code, output } = await runCommand('setup', 'react-app', rootDir, '--verbose', '--raw');

  expect(output).toBe(outputVerbose);
  expect(code).toBe(0);
});

test('setup:invalid', async () => {
  const { code, output } = await runCommand('setup', 'unknow', rootDir, '--raw');

  expect(output).toBe(outputInvalid);
  expect(code).toBe(1);
});
