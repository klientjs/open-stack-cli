import { projectDir, tmpRootDir } from './fixtures';

export const outputWrite = `[step] | Move to target dir
[step] | Check requirements
[step] | Initialize environment
[step] | Clone open-stack versions
[step] | Analyze project
[step] | Display analyze result
[info] |
[info] | ------------------------------------
[info] | Files changes
[info] | ------------------------------------
[info] |
[info] | CONFLICT:
[info] |   conflict.txt
[info] |
[info] | ADDED:
[info] |   added.txt
[info] |
[info] | UPDATED:
[info] |   updated.txt
[info] |
[info] | REMOVED:
[info] |   removed.txt
[info] |
[info] |
[info] | ------------------------------------
[info] | Package.json changes
[info] | ------------------------------------
[info] |
[info] | scripts
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |
[info] |   ADDED:
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |
[info] |
[info] | devDependencies
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |
[step] | Apply changes
[warn] | Conflicts have been detected during update
[warn] | You need to check and update elements in conflict manually
[pass] | Successfully updated (0.0.0 -> 0.0.1)`;

export const outputDry = `[step] | Move to target dir
[step] | Check requirements
[step] | Initialize environment
[step] | Clone open-stack versions
[step] | Analyze project
[step] | Display analyze result
[info] |
[info] | ------------------------------------
[info] | Files changes
[info] | ------------------------------------
[info] |
[info] | CONFLICT:
[info] |   conflict.txt
[info] |
[info] | ADDED:
[info] |   added.txt
[info] |
[info] | UPDATED:
[info] |   updated.txt
[info] |
[info] | REMOVED:
[info] |   removed.txt
[info] |
[info] |
[info] | ------------------------------------
[info] | Package.json changes
[info] | ------------------------------------
[info] |
[info] | scripts
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |
[info] |   ADDED:
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |
[info] |
[info] | devDependencies
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |
[warn] | Conflicts have been detected during update
[warn] | You need to check and update elements in conflict manually
[pass] | Successfully updated (0.0.0 -> 0.0.1)`;

export const outputDryReport = `[step] | Move to target dir
[step] | Check requirements
[step] | Initialize environment
[step] | Clone open-stack versions
[step] | Analyze project
[step] | Display analyze result
[info] |
[info] | ------------------------------------
[info] | Files changes
[info] | ------------------------------------
[info] |
[info] | CONFLICT:
[info] |   conflict.txt
[info] |
[info] | ADDED:
[info] |   added.txt
[info] |
[info] | UPDATED:
[info] |   updated.txt
[info] |
[info] | REMOVED:
[info] |   removed.txt
[info] |
[info] |
[info] | ------------------------------------
[info] | Package.json changes
[info] | ------------------------------------
[info] |
[info] | scripts
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |
[info] |   ADDED:
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |
[info] |
[info] | devDependencies
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |
[step] | Create report file
[warn] | Conflicts have been detected during update
[warn] | You need to check and update elements in conflict manually
[pass] | Successfully updated (0.0.0 -> 0.0.1)`;

export const outputDryFullConflict = `[step] | Move to target dir
[step] | Check requirements
[step] | Initialize environment
[step] | Clone open-stack versions
[step] | Analyze project
[step] | Display analyze result
[info] |
[info] | ------------------------------------
[info] | Files changes
[info] | ------------------------------------
[info] |
[info] | CONFLICT:
[info] |   conflict.txt
[info] |
[info] |
[info] | ------------------------------------
[info] | Package.json changes
[info] | ------------------------------------
[info] |
[info] | scripts
[info] |
[info] |   CONFLICT:
[info] |     test
[info] |
[info] |
[info] |
[info] | devDependencies
[info] |
[info] |   CONFLICT:
[info] |     test
[info] |
[info] |
[warn] | Conflicts have been detected during update
[warn] | You need to check and update elements in conflict manually
[pass] | Successfully updated (0.0.0 -> 0.0.1)`;

export const outputVerboseDry = `[step] | Move to target dir
[info] | Moved to ${projectDir}
[step] | Check requirements
[info] | Update from 0.0.0 open-stack version
[step] | Initialize environment
[info] | Prepare temporary folder
[info] | Remove ${tmpRootDir}/open-stack-cli
[info] | Create ${tmpRootDir}/open-stack-cli
[step] | Clone open-stack versions
[info] | Using https://github.com/klientjs/open-stack.git
[info] | Prev 0.0.0
[info] | Next 0.0.1
[step] | Analyze project
[info] | Compare package.json
[info] |
[info] |   - scripts
[info] |   - devDependencies
[info] |
[info] | Compare files corresponding to globs below
[info] |
[info] |   - *.txt
[info] |
[step] | Display analyze result
[info] |
[info] | ------------------------------------
[info] | Files changes
[info] | ------------------------------------
[info] |
[info] | CONFLICT:
[info] |   conflict.txt
[info] |
[info] | ADDED:
[info] |   added.txt
[info] |
[info] | UPDATED:
[info] |   updated.txt
[info] |
[info] | REMOVED:
[info] |   removed.txt
[info] |
[info] | SKIPPED:
[info] |   skipped.txt
[info] |
[info] |
[info] | ------------------------------------
[info] | Package.json changes
[info] | ------------------------------------
[info] |
[info] | scripts
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |
[info] |   ADDED:
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |   SKIPPED:
[info] |     skipped
[info] |
[info] |
[info] |
[info] | devDependencies
[info] |
[info] |   CONFLICT:
[info] |     conflict
[info] |     added
[info] |
[info] |   UPDATED:
[info] |     updated
[info] |
[info] |   REMOVED:
[info] |     removed
[info] |
[info] |   SKIPPED:
[info] |     skipped
[info] |
[info] |
[warn] | Conflicts have been detected during update
[warn] | You need to check and update elements in conflict manually
[pass] | Successfully updated (0.0.0 -> 0.0.1)`;

export const outputNoChanges = `[step] | Move to target dir
[step] | Check requirements
[step] | Initialize environment
[step] | Clone open-stack versions
[step] | Analyze project
[step] | Display analyze result
[info] |
[info] | ------------------------------------
[info] | Files changes
[info] | ------------------------------------
[info] |
[info] | No changes
[info] |
[info] | ------------------------------------
[info] | Package.json changes
[info] | ------------------------------------
[info] |
[info] | No changes
[info] |
[step] | Create report file
[pass] | Successfully updated (0.0.0 -> 0.0.1)`;

export const outputInvalidRepo = `[step] | Move to target dir
[step] | Check requirements
[step] | Initialize environment
[step] | Clone open-stack versions
[fail] | Unable to clone invalid with tag 0.0.0`;

export const outputInvalidTag = `[step] | Move to target dir
[step] | Check requirements
[step] | Initialize environment
[step] | Clone open-stack versions
[fail] | Unable to clone https://github.com/klientjs/open-stack.git with tag 0.0.0`;

export const outputInvalidConfig = `[step] | Move to target dir
[step] | Check requirements
[fail] | Unable to detect open-stack version your are using. Please set it in package.json or with --from option.`;
