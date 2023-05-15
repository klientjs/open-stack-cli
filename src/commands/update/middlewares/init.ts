import * as fs from 'fs';
import * as path from 'path';
import { moveTo } from '../../../core/process';

import type { Context } from '../context';

export default (context: Context) => {
  const { logger, inputs, tmp } = context;
  const { dir } = inputs;

  if (dir !== '.') {
    logger.step('Move to target dir');
    moveTo(dir);
    logger.info(`Moved to ${dir}`, 2);
  }

  logger.step('Check requirements');

  context.pkg = JSON.parse(fs.readFileSync(path.join(dir, 'package.json')).toString());

  const conf = context.pkg['open-stack'] as undefined | { version: string };
  const version = inputs.from || conf?.version;

  if (!version) {
    throw new Error(
      'Unable to detect open-stack version your are using. Please set it in package.json or with --from option.'
    );
  }

  logger.info(`Update from ${version} open-stack version`, 2);
  inputs.from = version;

  logger.step('Initialize environment');
  logger.info('Prepare temporary folder', 2);

  // Create tmp folders
  if (fs.existsSync(tmp.root)) {
    logger.info(`Remove ${tmp.root}`, 2);
    fs.rmSync(tmp.root, { recursive: true, force: true });
  }

  logger.info(`Create ${tmp.root}`, 2);
  fs.mkdirSync(tmp.root, { recursive: true });
};
