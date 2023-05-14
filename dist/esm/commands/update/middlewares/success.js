export default ({ logger, prevVersion, nextVersion, analyze }) => {
    if (analyze.hasConflicts) {
        logger.warn('Conflicts have been detected during update');
        logger.warn('You need to check and update elements in conflict manually');
    }
    logger.success(`Successfully updated (${prevVersion} -> ${nextVersion})`);
};
