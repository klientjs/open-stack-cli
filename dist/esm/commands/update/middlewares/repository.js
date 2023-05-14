import { cloneRepository } from '../../../core/repository';
export default (context) => {
    const { from, to, repository } = context.inputs;
    const { logger } = context;
    logger.step('Clone open-stack versions');
    logger.info(`Using ${repository}`, 2);
    context.prevVersion = cloneRepository(repository, from, context.tmp.prev);
    logger.info(`Prev ${context.prevVersion}`, 2);
    context.nextVersion = cloneRepository(repository, to, context.tmp.next);
    logger.info(`Next ${context.nextVersion}`, 2);
};
