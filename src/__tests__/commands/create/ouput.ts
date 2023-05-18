import { projectDir } from './fixtures';

export const outputSimple = `[step] | Clone open-stack
[step] | Initialize git folder
[step] | Install dependencies
[step] | Upgrade open-stack cli
[step] | Lunch open-stack configure command
       |
====== |
       |
[step] | Move to target dir
[step] | Initialize
[step] | Configure project
[pass] | Successfully configured
       |
====== |
       |
[step] | Commit configuration changes
[step] | Configure the remote origin
[pass] | Project is ready to be pushed, you need to run git push by yourself`;

export const outputVerbose = `[step] | Clone open-stack
[info] | Create project using latest in ${projectDir}
[info] | Move to ${projectDir}
[step] | Initialize git folder
[info] | Remove current git folder
[info] | Initialize fresh git folder
[info] | Add all untracked files
[info] | Create initial commit
[step] | Install dependencies
[step] | Upgrade open-stack cli
[step] | Lunch open-stack configure command
       |
====== |
       |
[step] | Move to target dir
[info] | Moved to ${projectDir}
[step] | Initialize
[step] | Configure project
[info] | Update package.json
[info] | Update README.md
[info] | Update LICENCE
[info] | Clear folders
[pass] | Successfully configured
       |
====== |
       |
[step] | Commit configuration changes
[step] | Configure the remote origin
[info] | Set origin url with git@github.com:klientjs/example
[pass] | Project is ready to be pushed, you need to run git push by yourself`;

export const outputVersionVerbose = `[step] | Clone open-stack
[info] | Create project using 1.0.0 in ${projectDir}
[info] | Move to ${projectDir}
[step] | Initialize git folder
[info] | Remove current git folder
[info] | Initialize fresh git folder
[info] | Add all untracked files
[info] | Create initial commit
[step] | Install dependencies
[step] | Upgrade open-stack cli
[step] | Lunch open-stack configure command
       |
====== |
       |
[step] | Move to target dir
[info] | Moved to ${projectDir}
[step] | Initialize
[step] | Configure project
[info] | Update package.json
[info] | Update README.md
[info] | Update LICENCE
[info] | Clear folders
[pass] | Successfully configured
       |
====== |
       |
[step] | Commit configuration changes
[step] | Configure the remote origin
[info] | Set origin url with git@github.com:klientjs/example
[pass] | Project is ready to be pushed, you need to run git push by yourself`;

export const outputInvalidVersion = `[step] | Clone open-stack
[fail] | Unable to clone https://github.com/klientjs/open-stack.git with tag 0.0.0`;
