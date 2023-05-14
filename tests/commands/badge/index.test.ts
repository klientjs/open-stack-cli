import { runCommand } from '../../core';
import { createCoverageSummary, coverageSummary, badgeOutput } from './fixtures';
import {
  outputSimple,
  outputVerbose,
  outputVerboseLightGreen,
  outputVerboseGreen,
  outputVerboseYellow,
  outputVerboseOrange,
  outputVerboseRed
} from './ouput';

test('badge:verbose', async () => {
  createCoverageSummary();

  const { code, output } = await runCommand(
    'badge',
    '--input',
    coverageSummary,
    '--output',
    badgeOutput,
    '--verbose',
    '--raw'
  );

  expect(output).toBe(outputVerbose);
  expect(code).toBe(0);
});

test('badge', async () => {
  createCoverageSummary();

  const { code, output } = await runCommand('badge', '--input', coverageSummary, '--output', badgeOutput, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});

test('badge:green', async () => {
  createCoverageSummary(91, 91, 91, 91);

  const { code, output } = await runCommand(
    'badge',
    '--input',
    coverageSummary,
    '--output',
    badgeOutput,
    '--raw',
    '--verbose'
  );

  expect(output).toBe(outputVerboseGreen);
  expect(code).toBe(0);
});

test('badge:lightgreen', async () => {
  createCoverageSummary(85, 85, 85, 85);

  const { code, output } = await runCommand(
    'badge',
    '--input',
    coverageSummary,
    '--output',
    badgeOutput,
    '--raw',
    '--verbose'
  );

  expect(output).toBe(outputVerboseLightGreen);
  expect(code).toBe(0);
});

test('badge:yellow', async () => {
  createCoverageSummary(75, 75, 75, 75);

  const { code, output } = await runCommand(
    'badge',
    '--input',
    coverageSummary,
    '--output',
    badgeOutput,
    '--raw',
    '--verbose'
  );

  expect(output).toBe(outputVerboseYellow);
  expect(code).toBe(0);
});

test('badge:orange', async () => {
  createCoverageSummary(65, 65, 65, 65);

  const { code, output } = await runCommand(
    'badge',
    '--input',
    coverageSummary,
    '--output',
    badgeOutput,
    '--raw',
    '--verbose'
  );

  expect(output).toBe(outputVerboseOrange);
  expect(code).toBe(0);
});

test('badge:red', async () => {
  createCoverageSummary(50, 50, 50, 50);

  const { code, output } = await runCommand(
    'badge',
    '--input',
    coverageSummary,
    '--output',
    badgeOutput,
    '--raw',
    '--verbose'
  );

  expect(output).toBe(outputVerboseRed);
  expect(code).toBe(0);
});
