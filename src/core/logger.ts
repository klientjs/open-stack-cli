import { stdout } from 'process';
import * as chalk from 'chalk';

const ansiRegex = [
  '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
  '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))'
].join('|');

export default class Logger {
  constructor(private verbosity = 1, private colors = false) {}

  write(x: string, minVerbosity = 1) {
    if (this.verbosity > 0 && this.verbosity >= minVerbosity) {
      let output = x;

      if (!this.colors) {
        output = output.replace(new RegExp(ansiRegex, 'g'), '');
      }

      stdout.write(`${output}\n`);
    }
  }

  step(x: string, mv = 1) {
    return this.write(chalk.cyan.bold('[step] | ') + chalk.bold(x), mv);
  }

  error(x: string, mv = 1) {
    return this.write(chalk.red.bold(`[fail] | ${x}`), mv);
  }

  success(x: string, mv = 1) {
    return this.write(chalk.green.bold(`[pass] | ${x}`), mv);
  }

  warn(x: string, mv = 1) {
    return this.write(chalk.yellow.bold(`[warn] | ${x}`), mv);
  }

  info(x: string, mv = 1) {
    return this.write(chalk.dim(`[info] | ${x}`), mv);
  }

  infoTitle(x: string, mv = 1) {
    return this.write(chalk.dim(`[info] | ${chalk.bold(x)}`), mv);
  }

  infoSubTitle(x: string, mv = 1) {
    return this.write(chalk.dim(`[info] | ${chalk.underline(x)}`), mv);
  }

  divide() {
    const style = chalk.cyan.bold;

    this.write(style('       |'));
    this.write(style('====== |'));
    this.write(style('       |'));
  }
}
