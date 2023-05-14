"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = require("yargs");
const helpers_1 = require("yargs/helpers");
const logger_1 = require("./core/logger");
const command_1 = require("./core/command");
const configure_1 = require("./commands/configure");
const update_1 = require("./commands/update");
const badge_1 = require("./commands/badge");
exports.default = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .scriptName('open-stack')
    .parserConfiguration({
    'dot-notation': false
})
    .command('configure [dir]', 'Create open-stack project', (y) => y.positional('dir', { describe: 'Target directory', default: '.' }), (args) => (0, command_1.default)(configure_1.default, args))
    .command('update [dir]', 'Update target dir to specific open-stack version', (y) => y
    .positional('dir', { describe: 'Directory', default: '.' })
    .option('to', { type: 'string', description: 'To open-stack version' })
    .option('from', { type: 'string', description: 'From open-stack version' })
    .option('repository', { type: 'string', description: 'Open-stack repository URL' })
    .option('files', { type: 'array', description: 'Glob pattern used to find files to sync' })
    .option('report', { type: 'string', description: 'Build report (ex: path/file.{md, json})' })
    .option('dry', { type: 'boolean', description: 'Run with dry mode (read-only mode)', default: false }), (args) => (0, command_1.default)(update_1.default, args))
    .command('badge', 'Create coverage badge', (y) => y
    .option('input', {
    type: 'string',
    description: 'Location of coverage-summary.json',
    default: 'coverage/coverage-summary.json'
})
    .option('output', { type: 'string', description: 'Target output file patg', default: 'coverage/badge.svg' })
    .option('label', { type: 'string', description: 'Label of badge', default: 'Coverage' }), (args) => (0, command_1.default)(badge_1.default, args))
    .command({
    command: '*',
    handler() {
        new logger_1.default().error('Invalid command name given, see usage with --help option.');
        process.exit(1);
    }
})
    .option('verbose', { type: 'boolean', description: 'Verbose mode', default: false })
    .option('silent', { type: 'boolean', description: 'Silent mode', default: false })
    .option('raw', { type: 'boolean', description: 'Disable colors', default: false });
