import * as path from 'path';
import * as fs from 'fs';
import { runCommand } from '../../core';
import { createFixtures, projectDir, configurationResponse } from './fixtures';
import { outputSimple, outputVerbose, outputVersionVerbose, outputInvalidVersion } from './ouput';

beforeEach(() => {
  createFixtures();

  jest.mock('prompts', () => () => Promise.resolve(configurationResponse));
});

test('create', async () => {
  const { code, output } = await runCommand('create', projectDir, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});

test('create:version', async () => {
  const { code, output } = await runCommand('create', projectDir, '--version', '1.0.0', '--verbose', '--raw');

  expect(output).toBe(outputVersionVerbose);
  expect(code).toBe(0);

  const pkg = JSON.parse(fs.readFileSync(path.join(projectDir, 'package.json')).toString().replace('\n', ''));
  expect(pkg['open-stack'].version).toBe('1.0.0');
});

test('create:version:invalid', async () => {
  const { code, output } = await runCommand('create', projectDir, '--version', '0.0.0', '--raw');

  expect(output).toBe(outputInvalidVersion);
  expect(code).toBe(1);
});

test('create:verbose', async () => {
  const { code, output } = await runCommand('create', projectDir, '--verbose', '--raw');

  expect(output).toBe(outputVerbose);
  expect(code).toBe(0);
});
