import * as fs from 'fs';
import { execSync } from 'child_process';
import { moveTo } from '../../../core/process';
import { cloneRepository, httpToSshOriginUrl, commit } from '../../../core/repository';

import config from '../../../core/config';
import execute from '../../../core/command';
import configure from '../../configure';

import type { Context } from '../context';

export default async (context: Context) => {
  const { logger, inputs } = context;
  const { dir, version, repository } = inputs;

  logger.step('Clone open-stack');
  logger.info(`Create project using ${version} in ${dir}`, 2);

  cloneRepository(repository || config.repository, version, dir);

  logger.info(`Move to ${dir}`, 2);
  let backToPreviousDir = moveTo(dir);

  logger.step('Initialize git folder');
  logger.info('Remove current git folder', 2);

  fs.rmSync('.git', { recursive: true, force: true });

  logger.info('Initialize fresh git folder', 2);
  execSync('git -c init.defaultBranch="main" init');
  execSync(`git remote add origin ${config.repository}`);

  logger.info('Add all untracked files', 2);
  execSync('git add .');

  logger.info('Create initial commit', 2);
  commit('initial commit');

  logger.step('Install dependencies');
  execSync('npm install');

  logger.step('Upgrade open-stack cli');
  execSync('npm upgrade @klient/open-stack-cli');

  backToPreviousDir();

  logger.step('Lunch open-stack configure command');

  logger.divide();
  await execute(configure, inputs, false);
  logger.divide();

  backToPreviousDir = moveTo(dir);

  logger.step('Commit configuration changes');
  execSync('git add .');
  commit('chore(stack): configure project');

  logger.step('Configure the remote origin');

  const repoUrl = execSync('npm pkg get repository.url').toString().replace('\n', '').replace(/"/g, '');
  const remote = httpToSshOriginUrl(repoUrl);

  logger.info(`Set origin url with ${remote}`, 2);
  execSync(`git remote set-url origin ${remote}`);

  backToPreviousDir();

  logger.success('Project is ready to be pushed, you need to run git push by yourself');
};
