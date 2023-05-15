import * as fs from 'fs';
import * as path from 'path';

import { globSync } from 'glob';

import type { Context, Pkg } from '../context';

const compare = (prev?: string, curr?: string, next?: string) => {
  if (prev === next || curr === next) {
    return 'SKIPPED';
  }

  if (curr !== prev) {
    return 'CONFLICT';
  }

  if (!prev && next) {
    return 'ADDED';
  }

  if (prev && !next) {
    return 'REMOVED';
  }

  // prev === curr && prev !== next
  return 'UPDATED';
};

const analyzePackageFile = ({ tmp, analyze, ...rest }: Context) => {
  const prev = JSON.parse(fs.readFileSync(path.join(tmp.prev, 'package.json')).toString());
  const next = JSON.parse(fs.readFileSync(path.join(tmp.next, 'package.json')).toString());
  const curr = rest.pkg as Record<string, Record<string, string>>;

  const pkg: Pkg = analyze.package;

  Object.keys(pkg).forEach((section) => {
    Object.keys(prev[section]).forEach((key) => {
      const prevVal = prev[section][key];
      const nextVal = next[section][key];
      const currVal = curr[section]?.[key];
      const status = compare(prevVal, currVal, nextVal);

      if (status === 'CONFLICT' || status === 'REMOVED') {
        pkg[section][status].push(key);
        analyze.isPkgChanged = true;
        analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
      }
    });

    Object.keys(next[section]).forEach((key) => {
      const nextVal = next[section][key];
      const prevVal = prev[section][key];
      const currVal = curr[section]?.[key];
      const status = compare(prevVal, currVal, nextVal);

      if (!pkg[section][status].includes(key)) {
        pkg[section][status].push(key);
        analyze.isPkgChanged = status !== 'SKIPPED' || analyze.isPkgChanged;
        analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
      }
    });
  });
};

const exists = (p: string) => fs.existsSync(p);
const read = (p: string) => fs.readFileSync(p).toString();

const analyzeFiles = ({ inputs, tmp, analyze }: Context) => {
  const { files } = analyze;

  globSync(inputs.files.map((file) => path.join(tmp.prev, file))).forEach((prevFile) => {
    const realPath = prevFile.replace(`${tmp.prev}/`, '');
    const nextPath = path.join(tmp.next, realPath);
    const currPath = path.join(process.cwd(), realPath);

    const prevVal = read(prevFile);
    const nextVal = exists(nextPath) ? read(nextPath) : undefined;
    const currVal = exists(currPath) ? read(currPath) : undefined;

    const status = compare(prevVal, currVal, nextVal);

    if (status === 'CONFLICT' || status === 'REMOVED') {
      files[status].push(realPath);
      analyze.isFilesChanged = true;
      analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
    }
  });

  globSync(inputs.files.map((file) => path.join(tmp.next, file))).forEach((nextFile) => {
    const realPath = nextFile.replace(`${tmp.next}/`, '');
    const prevPath = path.join(tmp.prev, realPath);
    const currPath = path.join(process.cwd(), realPath);

    const nextVal = read(nextFile);
    const prevVal = exists(prevPath) ? read(prevPath) : undefined;
    const currVal = exists(currPath) ? read(currPath) : undefined;

    const status = compare(prevVal, currVal, nextVal);

    if (!files[status].includes(realPath)) {
      files[status].push(realPath);
      analyze.isFilesChanged = status !== 'SKIPPED' || analyze.isFilesChanged;
      analyze.hasConflicts = status === 'CONFLICT' || analyze.hasConflicts;
    }
  });
};

export default (context: Context) => {
  const { logger, inputs, analyze } = context;

  logger.step('Analyze project');
  logger.info('Compare package.json', 2);

  logger.info('', 2);
  Object.keys(analyze.package).forEach((section) => logger.info(`  - ${section}`, 2));
  logger.info('', 2);

  analyzePackageFile(context);

  logger.info('Compare files corresponding to globs below', 2);

  logger.info('', 2);
  inputs.files.forEach((file) => logger.info(`  - ${file}`, 2));
  logger.info('', 2);

  analyzeFiles(context);
};
