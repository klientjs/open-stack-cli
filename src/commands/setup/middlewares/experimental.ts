import type { Context } from '../context';

const supportedLibs = ['react-app'];

export default async ({ logger, inputs }: Context) => {
  logger.warn('CAUTION You are using an experimental feature');

  if (!supportedLibs.includes(inputs.lib)) {
    throw new Error(`Supported libs are : ${supportedLibs.join(', ')}`);
  }
};
