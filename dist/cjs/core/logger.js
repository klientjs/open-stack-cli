"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const chalk = require("chalk");
const ansiRegex = [
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
    '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
].join('|');
class Logger {
    constructor(verbosity = 1, colors = false) {
        this.verbosity = verbosity;
        this.colors = colors;
    }
    write(x, minVerbosity = 1) {
        if (this.verbosity > 0 && this.verbosity >= minVerbosity) {
            let output = x;
            if (!this.colors) {
                output = output.replace(new RegExp(ansiRegex, 'g'), '');
            }
            process_1.stdout.write(`${output}\n`);
        }
    }
    step(x, mv = 1) {
        return this.write(chalk.cyan.bold('[step] | ') + chalk.bold(x), mv);
    }
    error(x, mv = 1) {
        return this.write(chalk.red.bold(`[fail] | ${x}`), mv);
    }
    success(x, mv = 1) {
        return this.write(chalk.green.bold(`[pass] | ${x}`), mv);
    }
    warn(x, mv = 1) {
        return this.write(chalk.yellow.bold(`[warn] | ${x}`), mv);
    }
    info(x, mv = 1) {
        return this.write(chalk.dim(`[info] | ${x}`), mv);
    }
    infoTitle(x, mv = 1) {
        return this.write(chalk.dim(`[info] | ${chalk.bold(x)}`), mv);
    }
    infoSubTitle(x, mv = 1) {
        return this.write(chalk.dim(`[info] | ${chalk.underline(x)}`), mv);
    }
    divide() {
        const style = chalk.cyan.bold;
        this.write(style('       |'));
        this.write(style('====== |'));
        this.write(style('       |'));
    }
}
exports.default = Logger;
