import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import Logger from './core/logger';
import execute from './core/command';
import setup, { supportedLibs } from './commands/setup';
import create from './commands/create';
import configure from './commands/configure';
import update from './commands/update';
import badge from './commands/badge';
export default yargs(hideBin(process.argv))
    .scriptName('open-stack')
    .parserConfiguration({
    'dot-notation': false
})
    .command('create [dir]', 'Create open-stack project', (y) => y
    .version(false)
    .positional('dir', { describe: 'Target directory', default: '.' })
    .option('repository', { type: 'string', description: 'Open-stack repository URL' })
    .option('version', { type: 'string', description: 'Current open-stack version', default: 'latest' }), (args) => execute(create, args))
    .command('configure [dir]', 'Configure open-stack project', (y) => y.positional('dir', { describe: 'Target directory', default: '.' }), (args) => execute(configure, args))
    .command('setup [lib] [dir]', 'Set up specific library in open-stack project (experimental)', (y) => y
    .positional('lib', { describe: 'Library name', choices: supportedLibs })
    .positional('dir', { describe: 'Target directory', default: '.' }), (args) => execute(setup, args))
    .command('update [dir]', 'Update target dir to specific open-stack version', (y) => y
    .positional('dir', { describe: 'Directory', default: '.' })
    .option('to', { type: 'string', description: 'To open-stack version' })
    .option('from', { type: 'string', description: 'From open-stack version' })
    .option('repository', { type: 'string', description: 'Open-stack repository URL' })
    .option('files', { type: 'array', description: 'Glob pattern used to find files to sync' })
    .option('report', { type: 'string', description: 'Build report (ex: path/file.{md, json})' })
    .option('dry', { type: 'boolean', description: 'Run with dry mode (read-only mode)', default: false }), (args) => execute(update, args))
    .command('badge', 'Create coverage badge', (y) => y
    .option('input', {
    type: 'string',
    description: 'Location of coverage-summary.json',
    default: 'coverage/coverage-summary.json'
})
    .option('output', { type: 'string', description: 'Target output file patg', default: 'coverage/badge.svg' })
    .option('label', { type: 'string', description: 'Label of badge', default: 'Coverage' })
    .option('incomplete', {
    type: 'boolean',
    description: 'Use only coverage statement member value',
    default: false
}), (args) => execute(badge, args))
    .command({
    command: '*',
    handler(args) {
        new Logger(1, !args.raw).error('Invalid command name given, see usage with --help option.');
        process.exit(1);
    }
})
    .option('verbose', { type: 'boolean', description: 'Verbose mode', default: false })
    .option('silent', { type: 'boolean', description: 'Silent mode', default: false })
    .option('raw', { type: 'boolean', description: 'Disable colors', default: false });
