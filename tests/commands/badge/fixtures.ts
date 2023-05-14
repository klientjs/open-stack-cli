import * as path from 'path';
import * as fs from 'fs';
import { tmpdir } from 'os';

export const coverageSummary = path.join(tmpdir(), 'test-coverage-summary.json');
export const badgeOutput = path.join(tmpdir(), 'test-badge.svg');

export const createCoverageSummary = (
  lines = 100,
  statements = 100,
  functions = 100,
  branches = 100,
  branchesTrue = 100
) => {
  fs.writeFileSync(
    coverageSummary,
    JSON.stringify({
      total: {
        lines: {
          pct: lines
        },
        statements: {
          pct: statements
        },
        functions: {
          pct: functions
        },
        branches: {
          pct: branches
        },
        branchesTrue: {
          pct: branchesTrue
        }
      }
    })
  );
};
