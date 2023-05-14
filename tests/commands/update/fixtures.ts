import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

const prettyJson = (n: unknown) => JSON.stringify(n, null, 2);

const curr = {
  'conflict.txt': 'custom',
  'removed.txt': 'initial',
  'skipped.txt': 'initial',
  'updated.txt': 'initial',
  'package.json': prettyJson({
    'open-stack': {
      version: '0.0.0'
    },
    scripts: {
      updated: 'initial',
      conflict: 'custom',
      removed: 'initial',
      skipped: 'initial'
    },
    devDependencies: {
      updated: 'initial',
      conflict: 'custom',
      removed: 'initial',
      skipped: 'initial',
      added: 'custom'
    }
  })
};

const prev = {
  'conflict.txt': 'initial',
  'removed.txt': 'initial',
  'skipped.txt': 'initial',
  'updated.txt': 'initial',
  'package.json': prettyJson({
    'open-stack': {
      version: '0.0.0'
    },
    scripts: {
      updated: 'initial',
      conflict: 'initial',
      removed: 'initial',
      skipped: 'initial'
    },
    devDependencies: {
      updated: 'initial',
      conflict: 'initial',
      removed: 'initial',
      skipped: 'initial'
    }
  })
};

const next = {
  'added.txt': 'initial',
  'skipped.txt': 'initial',
  'conflict.txt': 'updated',
  'updated.txt': 'updated',
  'package.json': prettyJson({
    'open-stack': {
      version: '0.0.1'
    },
    scripts: {
      added: 'initial',
      skipped: 'initial',
      updated: 'updated',
      conflict: 'updated'
    },
    devDependencies: {
      added: 'initial',
      skipped: 'initial',
      updated: 'updated',
      conflict: 'updated'
    }
  })
};

export const tmpRootDir = os.tmpdir();
export const tmpDir = path.join(tmpRootDir, 'open-stack-cli');

type Fixtures = { [_key: string]: Record<string, string> };

export const fixtures: Fixtures = {
  [path.join(tmpDir, 'curr')]: curr,
  [path.join(tmpDir, 'prev')]: prev,
  [path.join(tmpDir, 'next')]: next
};

export const fixturesNoChanges: Fixtures = {
  [path.join(tmpDir, 'curr')]: prev,
  [path.join(tmpDir, 'prev')]: prev,
  [path.join(tmpDir, 'next')]: prev
};

export const fixturesFullConflict: Fixtures = {
  [path.join(tmpDir, 'curr')]: {
    'package.json': prettyJson({
      'open-stack': {
        version: '0.0.0'
      }
    })
  },
  [path.join(tmpDir, 'prev')]: {
    'conflict.txt': 'initial',
    'package.json': prettyJson({
      'open-stack': {
        version: '0.0.0'
      },
      scripts: {
        test: 'example'
      },
      devDependencies: {
        test: 'example'
      }
    })
  },
  [path.join(tmpDir, 'next')]: {
    'conflict.txt': 'updated',
    'package.json': prettyJson({
      'open-stack': {
        version: '0.0.1'
      },
      scripts: {
        test: 'updated'
      },
      devDependencies: {
        test: 'updated'
      }
    })
  }
};

export function createFixtures(f = fixtures) {
  fs.rmSync(tmpDir, { recursive: true, force: true });

  Object.keys(f).forEach((dir: string) => {
    fs.mkdirSync(dir, { recursive: true });

    Object.keys(f[dir]).forEach((file: string) => {
      fs.writeFileSync(path.join(dir, file), f[dir][file]);
    });
  });
}
