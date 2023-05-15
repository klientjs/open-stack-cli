import * as path from 'path';
import * as child_process from 'child_process';
import * as os from 'os';
import * as fs from 'fs';
import { runCommand, fakeBuffer } from '../../core';
import { createFixtures, tmpRootDir, tmpDir, fixturesNoChanges, fixtures, fixturesFullConflict } from './fixtures';
import {
  outputVerboseDry,
  outputDry,
  outputWrite,
  outputDryReport,
  outputNoChanges,
  outputDryFullConflict
} from './ouput';

let currentFixtures = fixtures;

const rootDir = path.join(tmpDir, 'curr');

beforeEach(() => {
  createFixtures();

  jest.spyOn(os, 'tmpdir').mockImplementation(() => tmpRootDir);

  const execSync = jest.spyOn(child_process, 'execSync').mockImplementation((command: string) => {
    if (/(git)/g.test(command)) {
      if (command === 'git remote get-url origin') {
        return fakeBuffer('git@github.com:klientjs/test') as string;
      }

      if (command === 'git rev-parse --abbrev-ref HEAD') {
        return fakeBuffer('main') as string;
      }

      if (/(clone)/g.test(command)) {
        createFixtures(currentFixtures);
      }

      return fakeBuffer('0.0.1') as string;
    }

    execSync.mockRestore();
    return child_process.execSync(command);
  });
});

test('update:dry', async () => {
  const { code, output } = await runCommand('update', rootDir, '--files', '*.txt', '--raw', '--dry');

  expect(output).toBe(outputDry);
  expect(code).toBe(0);
});

test('update:dry:silent', async () => {
  const { code, output } = await runCommand('update', rootDir, '--files', '*.txt', '--dry', '--silent');

  expect(output).toBe('');
  expect(code).toBe(0);
});

test('update:dry:verbose', async () => {
  const { code, output } = await runCommand('update', rootDir, '--files', '*.txt', '--raw', '--verbose', '--dry');

  expect(output).toBe(outputVerboseDry);
  expect(code).toBe(0);
});

test('update:report:md', async () => {
  const report = path.join(tmpRootDir, 'open-stack-cli-report.md');
  const { code, output } = await runCommand(
    'update',
    rootDir,
    '--files',
    '*.txt',
    '--raw',
    '--dry',
    '--report',
    report
  );

  expect(output).toBe(outputDryReport);
  expect(fs.existsSync(report)).toBe(true);
  expect(code).toBe(0);
});

test('update:report:json', async () => {
  const report = path.join(tmpRootDir, 'open-stack-cli-report.json');
  const { code, output } = await runCommand(
    'update',
    rootDir,
    '--files',
    '*.txt',
    '--raw',
    '--dry',
    '--report',
    report
  );

  expect(output).toBe(outputDryReport);
  expect(fs.existsSync(report)).toBe(true);
  expect(code).toBe(0);
});

test('update:no-changes', async () => {
  currentFixtures = fixturesNoChanges;

  createFixtures(fixturesNoChanges);

  const report = path.join(tmpRootDir, 'open-stack-cli-report.md');
  const { code, output } = await runCommand('update', rootDir, '--files', '*.txt', '--raw', '--report', report);

  expect(output).toBe(outputNoChanges);
  expect(code).toBe(0);

  currentFixtures = fixtures;
});

test('update', async () => {
  const { code, output } = await runCommand('update', rootDir, '--files', '*.txt', '--raw');

  expect(output).toBe(outputWrite);
  expect(code).toBe(0);
});

test('update:local', async () => {
  expect((await runCommand('update', rootDir, '--dry', '--silent')).code).toBe(0);
});

test('update:conflict', async () => {
  currentFixtures = fixturesFullConflict;

  createFixtures(fixturesFullConflict);

  const { code, output } = await runCommand('update', rootDir, '--files', '*.txt', '--dry', '--raw');

  expect(output).toBe(outputDryFullConflict);
  expect(code).toBe(0);

  currentFixtures = fixtures;
});
