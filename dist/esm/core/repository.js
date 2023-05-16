import { execSync } from 'child_process';
import { moveTo } from './process';
const cloneLatestVersion = (repository, dir) => {
    execSync(`git clone --quiet ${repository} ${dir}`);
    const backToPreviousDir = moveTo(dir);
    execSync('git fetch --tags -f');
    const version = execSync('git describe --tags --abbrev=0').toString().replace('\n', '');
    execSync(`git -c advice.detachedHead=false checkout ${version} --quiet`);
    backToPreviousDir();
    return version;
};
export const cloneRepository = (repository, tag, dir) => {
    try {
        if (tag === 'latest') {
            return cloneLatestVersion(repository, dir);
        }
        execSync(`git -c advice.detachedHead=false clone --quiet --depth=1 --branch ${tag} ${repository} ${dir}`);
    }
    catch (e) {
        throw new Error(`Unable to clone ${repository} with tag ${tag}\n`);
    }
    return tag;
};
export const sourceRepositoryToUrl = (repo) => {
    const origin = repo || execSync('git remote get-url origin').toString().replace('\n', '');
    return origin.indexOf('http') !== 0
        ? `https://github.com/${origin.split('@github.com:')[1].replace('.git', '')}`
        : origin.replace('.git', '');
};
export const getCurrentBranchName = () => execSync('git rev-parse --abbrev-ref HEAD').toString().replace('\n', '');
