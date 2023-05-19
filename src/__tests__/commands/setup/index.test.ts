import { runCommand } from '../../core';
import { createNewProject, removeRootDir, rootDir } from './fixtures';
import { outputReactAppVerbose, outputReactApp, outputReact, outputReactVerbose } from './ouput';

beforeAll(() => {
  removeRootDir();
});

beforeEach(() => {
  createNewProject();
});

test('setup:react', async () => {
  const { code, output } = await runCommand('setup', 'react', rootDir, '--raw');

  expect(output).toBe(outputReact);
  expect(code).toBe(0);
});

test('setup:react:verbose', async () => {
  const { code, output } = await runCommand('setup', 'react', rootDir, '--verbose', '--raw');

  expect(output).toBe(outputReactVerbose);
  expect(code).toBe(0);
});

test('setup:react-app', async () => {
  const { code, output } = await runCommand('setup', 'react-app', rootDir, '--raw');

  expect(output).toBe(outputReactApp);
  expect(code).toBe(0);
});

test('setup:react-app:verbose', async () => {
  const { code, output } = await runCommand('setup', 'react-app', rootDir, '--verbose', '--raw');

  expect(output).toBe(outputReactAppVerbose);
  expect(code).toBe(0);
});

test('setup:invalid', async () => {
  const { code } = await runCommand('setup', 'unknow', rootDir, '--raw');

  expect(code).toBe(0);
});
