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
const prompts = require("prompts");
const fs = require("fs");
const child_process_1 = require("child_process");
const repository_1 = require("../../../core/repository");
const requirePrompt = (v) => v !== '' || 'Required';
exports.default = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger, inputs } = context;
    const { dir } = inputs;
    if (dir !== '.') {
        logger.step('Move to target dir');
        process.chdir(dir);
        logger.info(`Moved to ${dir}`, 2);
    }
    logger.step('Initialize');
    const responses = yield prompts([
        {
            message: 'What is the full package name ? (including org name if need)',
            type: 'text',
            name: 'name',
            validate: requirePrompt
        },
        {
            message: 'Describe your package in one sentence',
            type: 'text',
            name: 'description',
            validate: requirePrompt
        },
        {
            message: 'Can you give some keyworks that relate to your package ?',
            type: 'text',
            name: 'keywords'
        },
        {
            message: 'What will be the repository URL ?',
            type: 'text',
            name: 'repository',
            initial: `${(0, repository_1.sourceRepositoryToUrl)()}.git`,
            validate: requirePrompt
        },
        {
            message: 'What is your exact username (or organization name) ?',
            type: 'text',
            name: 'owner',
            validate: requirePrompt
        }
    ], {
        onCancel: () => process.exit(1)
    });
    logger.step('Configure project');
    logger.info('Update package.json', 2);
    (0, child_process_1.execSync)(`npm pkg set name="${responses.name}"`);
    (0, child_process_1.execSync)(`npm pkg set description="${responses.description}"`);
    (0, child_process_1.execSync)(`npm pkg set repository.url="${responses.repository}"`);
    responses.keywords.split(' ').forEach((k, i) => (0, child_process_1.execSync)(`npm pkg set keywords.${i}=${k}`));
    (0, child_process_1.execSync)('npm pkg set repository.type=git');
    (0, child_process_1.execSync)('npm pkg delete scripts.configure');
    logger.info('Update README.md', 2);
    fs.writeFileSync('README.md', `# ${responses.name}\n\n![badge-coverage](.github/badges/coverage.svg)\n`);
    logger.info('Update LICENCE', 2);
    const licence = fs.readFileSync('LICENCE').toString();
    fs.writeFileSync('LICENCE', licence.replace(/Copyright \(c\) (.*) klientjs/g, `Copyright (c) ${new Date().getFullYear()} ${responses.owner}`));
    logger.info('Clear folders', 2);
    ['docs'].forEach((folder) => fs.rmSync(folder, { recursive: true, force: true }));
    logger.success('Successfully configured');
});
