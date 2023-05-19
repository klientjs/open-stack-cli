import { coverageSummary, badgeOutput } from './fixtures';

export const outputSimple = `[step] | Analyze coverage
[step] | Create badge
[pass] | Successfully generated`;

export const outputVerbose = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: 100%
[info] | - statements: 100%
[info] | - functions: 100%
[info] | - branches: 100%
[info] | -----------------------
[info] | TOTAL: 100%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-100%25-brightgreen.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;

export const outputIncompleteVerbose = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: 0%
[info] | - statements: 80%
[info] | - functions: 0%
[info] | - branches: 0%
[info] | -----------------------
[info] | TOTAL: 80%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-80%25-lightgreen.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;

export const outputVerboseGreen = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: 91%
[info] | - statements: 91%
[info] | - functions: 91%
[info] | - branches: 91%
[info] | -----------------------
[info] | TOTAL: 91%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-91%25-green.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;

export const outputVerboseLightGreen = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: 85%
[info] | - statements: 85%
[info] | - functions: 85%
[info] | - branches: 85%
[info] | -----------------------
[info] | TOTAL: 85%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-85%25-lightgreen.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;

export const outputVerboseYellow = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: 75%
[info] | - statements: 75%
[info] | - functions: 75%
[info] | - branches: 75%
[info] | -----------------------
[info] | TOTAL: 75%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-75%25-yellow.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;

export const outputVerboseOrange = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: 65%
[info] | - statements: 65%
[info] | - functions: 65%
[info] | - branches: 65%
[info] | -----------------------
[info] | TOTAL: 65%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-65%25-orange.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;

export const outputVerboseRed = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: 50%
[info] | - statements: 50%
[info] | - functions: 50%
[info] | - branches: 50%
[info] | -----------------------
[info] | TOTAL: 50%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-50%25-red.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;

export const outputVerboseUnknown = `[step] | Analyze coverage
[info] | Read ${coverageSummary}
[info] | - lines: Unknown%
[info] | - statements: Unknown%
[info] | - functions: Unknown%
[info] | - branches: Unknown%
[info] | -----------------------
[info] | TOTAL: 0%
[step] | Create badge
[info] | Make request to https://img.shields.io/badge/Coverage-0%25-red.svg
[info] | Content uploaded in ${badgeOutput}
[pass] | Successfully generated`;
