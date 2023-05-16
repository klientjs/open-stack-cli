import { runCommand } from './core';

test('command:unknown', async () => {
  const { code } = await runCommand('unknow');
  expect(code).toBe(1);
});

test('help', async () => {
  const { code } = await runCommand('--help');
  expect(code).toBe(0);
});

test('create:help', async () => {
  const { code } = await runCommand('create', '--help');
  expect(code).toBe(0);
});

test('update:help', async () => {
  const { code } = await runCommand('update', '--help');
  expect(code).toBe(0);
});

test('badge:help', async () => {
  const { code } = await runCommand('badge', '--help');
  expect(code).toBe(0);
});

test('configure:help', async () => {
  const { code } = await runCommand('configure', '--help');
  expect(code).toBe(0);
});
