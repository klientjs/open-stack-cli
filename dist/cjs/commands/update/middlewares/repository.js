"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const repository_1 = require("../../../core/repository");
exports.default = (context) => {
    const { from, to, repository } = context.inputs;
    const { logger } = context;
    logger.step('Clone open-stack versions');
    logger.info(`Using ${repository}`, 2);
    context.prevVersion = (0, repository_1.cloneRepository)(repository, from, context.tmp.prev);
    logger.info(`Prev ${context.prevVersion}`, 2);
    context.nextVersion = (0, repository_1.cloneRepository)(repository, to, context.tmp.next);
    logger.info(`Next ${context.nextVersion}`, 2);
};
