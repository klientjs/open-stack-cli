"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const child_process_1 = require("child_process");
const process_1 = require("../../../core/process");
exports.default = ({ logger, analyze, inputs, tmp, nextVersion }) => {
    if (inputs.dry || (!analyze.isFilesChanged && !analyze.isPkgChanged)) {
        return;
    }
    logger.step('Apply changes');
    if (analyze.isFilesChanged) {
        logger.info('', 2);
        logger.info('Update files', 2);
    }
    const files = analyze.files;
    Object.keys(files).forEach((status) => {
        files[status].forEach((file) => {
            const label = `[${status}]`.padEnd(10);
            switch (status) {
                case 'ADDED':
                case 'UPDATED':
                    fs.copyFileSync(path.join(tmp.next, file), path.join(process.cwd(), file));
                    logger.info(`  ${label} ${file}`, 2);
                    break;
                case 'REMOVED':
                    fs.rmSync(path.join(process.cwd(), file));
                    logger.info(`  ${label} ${file}`, 2);
                    break;
                case 'CONFLICT':
                case 'SKIPPED':
                default:
                    break;
            }
        });
    });
    if (analyze.isPkgChanged) {
        logger.info('', 2);
        logger.info('Update package.json', 2);
    }
    const pkg = analyze.package;
    let nextVal;
    Object.keys(pkg).forEach((section) => {
        Object.keys(pkg[section]).forEach((status) => {
            pkg[section][status].forEach((p) => {
                const label = `[${status}]`.padEnd(10);
                let backToPreviousDir = null;
                switch (status) {
                    case 'ADDED':
                    case 'UPDATED':
                        backToPreviousDir = (0, process_1.moveTo)(tmp.next);
                        nextVal = (0, child_process_1.execSync)(`npm pkg get ${section}.${p}`).toString().replace('\n', '');
                        backToPreviousDir();
                        (0, child_process_1.execSync)(`npm pkg set ${section}.${p}=${nextVal}`);
                        logger.info(`  ${label} ${section}.${p}`, 2);
                        break;
                    case 'REMOVED':
                        (0, child_process_1.execSync)(`npm pkg delete ${section}.${p}`);
                        logger.info(`  ${label} ${section}.${p}`, 2);
                        break;
                    case 'CONFLICT':
                    case 'SKIPPED':
                    default:
                        break;
                }
            });
        });
    });
    if (nextVersion !== (0, child_process_1.execSync)(`npm pkg get open-stack.version`).toString().replace(/\n|"/g, '')) {
        (0, child_process_1.execSync)(`npm pkg set open-stack.version=${nextVersion}`);
        logger.info(`  [UPDATED]  open-stack.version`, 2);
        logger.info('', 2);
    }
};
