import { rootDir } from './fixtures';

export const outputSimple = `[step] | Move to target dir
[step] | Initialize
[step] | Configure project
[pass] | Successfully configured`;

export const outputVerbose = `[step] | Move to target dir
[info] | Moved to ${rootDir}
[step] | Initialize
[step] | Configure project
[info] | Update package.json
[info] | Update README.md
[info] | Update LICENCE
[info] | Clear folders
[pass] | Successfully configured`;
