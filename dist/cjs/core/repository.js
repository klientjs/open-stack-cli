"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentBranchName = exports.sourceRepositoryToUrl = exports.cloneRepository = void 0;
const child_process_1 = require("child_process");
const cloneLatestVersion = (repository, dir) => {
    let version = 'latest';
    try {
        (0, child_process_1.execSync)(`git clone --quiet ${repository} ${dir} && cd ${dir} && git fetch --tags -f`);
        version = (0, child_process_1.execSync)(`cd ${dir} && git describe --tags --abbrev=0`).toString().replace('\n', '');
        (0, child_process_1.execSync)(`cd ${dir} && git -c advice.detachedHead=false checkout ${version} --quiet`);
    }
    catch (e) {
        throw new Error(`Unable to clone ${repository} with tag ${version}\n`);
    }
    return version;
};
const cloneRepository = (repository, tag, dir) => {
    if (tag === 'latest') {
        return cloneLatestVersion(repository, dir);
    }
    try {
        (0, child_process_1.execSync)(`git -c advice.detachedHead=false clone --quiet --depth=1 --branch ${tag} ${repository} ${dir}`);
    }
    catch (e) {
        throw new Error(`Unable to clone ${repository} with tag ${tag}\n`);
    }
    return tag;
};
exports.cloneRepository = cloneRepository;
const sourceRepositoryToUrl = (repo) => {
    const origin = repo || (0, child_process_1.execSync)('git remote get-url origin').toString().replace('\n', '');
    return origin.indexOf('http') !== 0
        ? `https://github.com/${origin.split('@github.com:')[1].replace('.git', '')}`
        : origin;
};
exports.sourceRepositoryToUrl = sourceRepositoryToUrl;
const getCurrentBranchName = () => (0, child_process_1.execSync)('git rev-parse --abbrev-ref HEAD').toString().replace('\n', '');
exports.getCurrentBranchName = getCurrentBranchName;
