import type { Context } from '../context';

export default async ({ logger }: Context) => {
  logger.warn('CAUTION You are using an experimental feature');
};
