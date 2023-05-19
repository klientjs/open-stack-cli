import { rootDir } from './fixtures';

export const outputReactApp = `[warn] | CAUTION You are using an experimental feature
[step] | Move to target dir
[step] | Update package.json
[step] | Update files
[step] | Install dependencies
[step] | Create src and public folders
[step] | Update react files
[step] | Cleaning unuseful files
[step] | Run pre-commit script
[pass] | Successfully setup`;

export const outputReactAppVerbose = `[warn] | CAUTION You are using an experimental feature
[step] | Move to target dir
[info] | Moved to ${rootDir}
[step] | Update package.json
[info] | Setup dependencies
[info] | Setup devDependencies
[info] | Setup scripts
[info] | Setup browserslist
[step] | Update files
[info] | Update .gitignore
[info] | Update .eslintrc
[info] | Update tsconfig.json
[info] | Remove jest.config.json
[step] | Install dependencies
[step] | Create src and public folders
[step] | Update react files
[step] | Cleaning unuseful files
[step] | Run pre-commit script
[pass] | Successfully setup`;

export const outputReact = `[warn] | CAUTION You are using an experimental feature
[step] | Move to target dir
[step] | Update package.json
[step] | Update files
[step] | Install dependencies
[step] | Run pre-commit script
[pass] | Successfully setup`;

export const outputReactVerbose = `[warn] | CAUTION You are using an experimental feature
[step] | Move to target dir
[info] | Moved to ${rootDir}
[step] | Update package.json
[info] | Setup dependencies
[info] | Setup devDependencies
[step] | Update files
[info] | Create .babelrc
[info] | Update .eslintrc
[info] | Update jest.config.json
[info] | Update tsconfig.json
[step] | Install dependencies
[step] | Run pre-commit script
[pass] | Successfully setup`;
