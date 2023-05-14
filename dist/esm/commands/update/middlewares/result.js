const displayAnalyzeResult = (context) => {
    const { logger, analyze, inputs } = context;
    const files = analyze.files;
    logger.info('');
    logger.info('------------------------------------');
    logger.infoTitle('Files changes');
    logger.info('------------------------------------');
    logger.info('');
    if (!analyze.isFilesChanged && !inputs.verbose) {
        logger.info('No changes');
    }
    Object.keys(files).forEach((status) => {
        if (!files[status].length || (status === 'SKIPPED' && !inputs.verbose)) {
            return;
        }
        logger.info(`${status}:`);
        files[status].forEach((p) => logger.info(`  ${p}`));
        logger.info('');
    });
    logger.info('');
    logger.info('------------------------------------');
    logger.infoTitle('Package.json changes');
    logger.info('------------------------------------');
    const pkg = analyze.package;
    Object.keys(pkg).forEach((section) => {
        const nbChanges = Object.keys(pkg[section])
            .filter((status) => status !== 'SKIPPED')
            .map((status) => pkg[section][status].length)
            .reduce((prev, curr) => prev + curr);
        if (nbChanges === 0 && !inputs.verbose) {
            return;
        }
        logger.info('');
        logger.infoSubTitle(`${section}`);
        logger.info('');
        Object.keys(pkg[section]).forEach((status) => {
            if (!pkg[section][status].length || (status === 'SKIPPED' && !inputs.verbose)) {
                return;
            }
            logger.info(`  ${status}:`);
            pkg[section][status].forEach((p) => logger.info(`    ${p}`));
            logger.info('');
        });
        logger.info('');
    });
    if (!analyze.isPkgChanged && !inputs.verbose) {
        logger.info('');
        logger.info('No changes');
        logger.info('');
    }
};
export default (context) => {
    context.logger.step('Display analyze result');
    displayAnalyzeResult(context);
};
