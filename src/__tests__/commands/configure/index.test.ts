import { execSync } from 'child_process';
import { moveTo } from '../../../core/process';
import { commit } from '../../../core/repository';
import { runCommand, exitMock } from '../../core';
import { createNewProject, rootDir } from './fixtures';
import { outputVerbose, outputSimple } from './ouput';

import type { PromptObject } from 'prompts';

const responses = {
  name: '@klient/example',
  description: 'Example description',
  repository: 'https://github.com/klientjs/example',
  keywords: 'example test klient',
  owner: 'klientjstest'
};

jest.mock('prompts', () => () => Promise.resolve(responses));

beforeEach(() => {
  createNewProject();
});

test('configure', async () => {
  const { code, output } = await runCommand('configure', rootDir, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});

test('configure:verbose', async () => {
  const { code, output } = await runCommand('configure', rootDir, '--raw', '--verbose');

  expect(output).toBe(outputVerbose);
  expect(code).toBe(0);
});

test('configure:codespace', async () => {
  const backToPreviousDir = moveTo(rootDir);
  execSync('git add .');
  commit('initial commit');
  execSync('git remote remove origin');
  backToPreviousDir();

  const { code, output } = await runCommand('configure', rootDir, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});

test('configure:validate', async () => {
  jest.mock('prompts', () => (questions: PromptObject[]) => {
    questions
      .filter((q) => typeof q.validate === 'function')
      .forEach((q: any) => {
        expect(q.validate('')).toBe('Required');
        expect(q.validate('ok')).toBe(true);
      });

    return Promise.resolve(responses);
  });

  const { code, output } = await runCommand('configure', rootDir, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});

test('configure:owner:initial', async () => {
  jest.mock('prompts', () => (questions: PromptObject[]) => {
    const repoQuestion = questions.find((q) => q.name === 'owner') as any;

    expect(repoQuestion.initial('https://github.com/klientjs/example.git')).toBe('klientjs');

    return Promise.resolve(responses);
  });

  const { code, output } = await runCommand('configure', rootDir, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});

test('configure:cancel', async () => {
  jest.mock('prompts', () => (_questions: any, options: any) => {
    options.onCancel();
    expect(exitMock).toBeCalledWith(1);
    return Promise.resolve(responses);
  });

  const { code, output } = await runCommand('configure', rootDir, '--raw');

  expect(output).toBe(outputSimple);
  expect(code).toBe(0);
});
