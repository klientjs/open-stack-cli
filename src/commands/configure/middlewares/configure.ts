import * as prompts from 'prompts';
import * as fs from 'fs';
import { execSync } from 'child_process';

import config from '../../../core/config';
import { sourceRepositoryToUrl } from '../../../core/repository';

import type { Context } from '../context';

const requirePrompt = (v: string) => v !== '' || 'Required';

export default async (context: Context) => {
  const { logger, inputs } = context;
  const { dir } = inputs;

  if (dir !== '.') {
    logger.step('Move to target dir');
    process.chdir(dir);
    logger.info(`Moved to ${dir}`, 2);
  }

  logger.step('Initialize');

  const repoUrl = sourceRepositoryToUrl();
  const sourceRepository = repoUrl && `${repoUrl}.git`;

  const responses: Record<string, string> = await prompts(
    [
      {
        message: 'What is the full package name ? (including org name if need)',
        type: 'text',
        name: 'name',
        validate: requirePrompt
      },
      {
        message: 'What will be the repository URL (https) ?',
        type: 'text',
        name: 'repository',
        initial: sourceRepository !== config.repository ? `${sourceRepository}.git` : '',
        validate: requirePrompt
      },
      {
        message: 'What is your exact username (or organization name) ?',
        type: 'text',
        name: 'owner',
        validate: requirePrompt,
        initial: (prev: string) => {
          const url = new URL(prev);
          return url.pathname.split('/')[1];
        }
      },
      {
        message: 'Can you describe your package in one sentence ?',
        type: 'text',
        name: 'description'
      },
      {
        message: 'Can you give some keyworks that relate to your package ?',
        type: 'text',
        name: 'keywords'
      }
    ],
    {
      onCancel: () => process.exit(1)
    }
  );

  logger.step('Configure project');
  logger.info('Update package.json', 2);

  execSync(`npm pkg set name="${responses.name}"`);
  execSync(`npm pkg set repository.url="${responses.repository}"`);
  execSync('npm pkg set repository.type=git');

  if (responses.description !== '') {
    execSync(`npm pkg set description="${responses.description}"`);
  }

  if (responses.keywords !== '') {
    responses.keywords.split(' ').forEach((k, i) => execSync(`npm pkg set keywords.${i}=${k}`));
  }

  execSync('npm pkg delete scripts.configure');

  logger.info('Update README.md', 2);

  fs.writeFileSync('README.md', `# ${responses.name}\n\n![badge-coverage](.github/badges/coverage.svg)\n`);

  logger.info('Update LICENCE', 2);

  const licence = fs.readFileSync('LICENCE').toString();

  fs.writeFileSync(
    'LICENCE',
    licence.replace(/Copyright \(c\) (.*) klientjs/g, `Copyright (c) ${new Date().getFullYear()} ${responses.owner}`)
  );

  logger.info('Clear folders', 2);

  ['doc'].forEach((folder) => fs.rmSync(folder, { recursive: true, force: true }));

  logger.success('Successfully configured');
};
