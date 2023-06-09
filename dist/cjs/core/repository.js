"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commit = exports.getCurrentBranchName = exports.httpToSshOriginUrl = exports.sourceRepositoryToUrl = exports.cloneRepository = void 0;
const child_process_1 = require("child_process");
const process_1 = require("./process");
const cloneLatestVersion = (repository, dir) => {
    (0, child_process_1.execSync)(`git clone --quiet ${repository} ${dir}`);
    const backToPreviousDir = (0, process_1.moveTo)(dir);
    (0, child_process_1.execSync)('git fetch --tags -f');
    const version = (0, child_process_1.execSync)('git describe --tags --abbrev=0').toString().replace('\n', '');
    (0, child_process_1.execSync)(`git -c advice.detachedHead=false checkout ${version} --quiet`);
    backToPreviousDir();
    return version;
};
const cloneRepository = (repository, tag, dir) => {
    try {
        if (tag === 'latest') {
            return cloneLatestVersion(repository, dir);
        }
        (0, child_process_1.execSync)(`git -c advice.detachedHead=false clone --quiet --depth=1 --branch ${tag} ${repository} ${dir}`);
    }
    catch (e) {
        throw new Error(`Unable to clone ${repository} with tag ${tag}\n`);
    }
    return tag;
};
exports.cloneRepository = cloneRepository;
const sourceRepositoryToUrl = (repo) => {
    let origin = repo || '';
    if (!repo && (0, child_process_1.execSync)('git remote -v').toString().includes('origin')) {
        origin = (0, child_process_1.execSync)('git remote get-url origin').toString().replace('\n', '');
    }
    if (!origin) {
        return '';
    }
    return origin.indexOf('http') !== 0
        ? `https://github.com/${origin.split('@github.com:')[1].replace('.git', '')}`
        : origin.replace('.git', '');
};
exports.sourceRepositoryToUrl = sourceRepositoryToUrl;
const httpToSshOriginUrl = (repo) => {
    const url = new URL(repo);
    return `git@${url.hostname}:${url.pathname.substring(1)}`;
};
exports.httpToSshOriginUrl = httpToSshOriginUrl;
const getCurrentBranchName = () => (0, child_process_1.execSync)('git rev-parse --abbrev-ref HEAD').toString().replace('\n', '');
exports.getCurrentBranchName = getCurrentBranchName;
const gitCommitConfig = '-c user.email="open-stack@github.com" -c user.name="OpenStack CLI"';
const commit = (message) => {
    (0, child_process_1.execSync)(`git ${gitCommitConfig} commit -m"${message}" --allow-empty --no-verify`);
};
exports.commit = commit;
