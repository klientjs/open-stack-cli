import * as fs from 'fs';

const initialCwd = process.env.PWD as string;

export const chdir = (dir: string) => {
  if (fs.existsSync(dir)) {
    process.chdir(dir);
    process.cwd();
  }
};

export const moveTo = (dir: string) => {
  if (dir === '.') {
    return () => undefined;
  }

  const previousDir = process.cwd();

  chdir(dir);

  return () => chdir(previousDir);
};

export const resetCwd = () => chdir(initialCwd);
