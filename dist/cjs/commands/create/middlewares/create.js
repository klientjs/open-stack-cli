"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const child_process_1 = require("child_process");
const process_1 = require("../../../core/process");
const repository_1 = require("../../../core/repository");
const config_1 = require("../../../core/config");
const command_1 = require("../../../core/command");
const configure_1 = require("../../configure");
exports.default = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger, inputs } = context;
    const { dir, version, repository } = inputs;
    logger.step('Clone open-stack');
    logger.info(`Create project using ${version} in ${dir}`, 2);
    (0, repository_1.cloneRepository)(repository || config_1.default.repository, version, dir);
    logger.info(`Move to ${dir}`, 2);
    (0, process_1.moveTo)(dir);
    logger.step('Initialize git folder');
    logger.info('Remove current git folder', 2);
    fs.rmSync('.git', { recursive: true, force: true });
    logger.info('Initialize fresh git folder', 2);
    (0, child_process_1.execSync)('git init');
    (0, child_process_1.execSync)(`git remote add origin ${config_1.default.repository}`);
    logger.info('Add all untracked files', 2);
    (0, child_process_1.execSync)('git add .');
    logger.info('Create initial commit', 2);
    (0, repository_1.commit)('initial commit');
    logger.step('Install dependencies');
    (0, child_process_1.execSync)('npm install');
    logger.step('Lunch open-stack configure command');
    logger.divide();
    yield (0, command_1.default)(configure_1.default, inputs, false);
    logger.divide();
    const backToPreviousDir = (0, process_1.moveTo)(dir);
    logger.step('Commit configuration changes');
    (0, child_process_1.execSync)('git add .');
    (0, repository_1.commit)('chore(stack): configure project');
    logger.step('Configure the remote origin');
    const repoUrl = (0, child_process_1.execSync)('npm pkg get repository.url').toString().replace('\n', '').replace(/"/g, '');
    const remote = (0, repository_1.httpToSshOriginUrl)(repoUrl);
    logger.info(`Configure the remote origin ${remote}`, 2);
    (0, child_process_1.execSync)(`git remote set-url origin ${remote}`);
    backToPreviousDir();
    logger.success('Project is ready to be pushed, you need to run git push by yourself');
});
