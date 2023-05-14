import { execSync } from 'child_process';

const cloneLatestVersion = (repository: string, dir: string): string => {
  let version = 'latest';

  try {
    // Move to latest tag defined on main branch
    execSync(`git clone --quiet ${repository} ${dir} && cd ${dir} && git fetch --tags -f`);
    version = execSync(`cd ${dir} && git describe --tags --abbrev=0`).toString().replace('\n', '');
    execSync(`cd ${dir} && git -c advice.detachedHead=false checkout ${version} --quiet`);
  } catch (e) {
    throw new Error(`Unable to clone ${repository} with tag ${version}\n`);
  }

  return version;
};

export const cloneRepository = (repository: string, tag: string, dir: string) => {
  if (tag === 'latest') {
    return cloneLatestVersion(repository, dir);
  }

  try {
    execSync(`git -c advice.detachedHead=false clone --quiet --depth=1 --branch ${tag} ${repository} ${dir}`);
  } catch (e) {
    throw new Error(`Unable to clone ${repository} with tag ${tag}\n`);
  }

  return tag;
};

export const sourceRepositoryToUrl = (repo?: string) => {
  const origin = repo || execSync('git remote get-url origin').toString().replace('\n', '');

  return origin.indexOf('http') !== 0
    ? `https://github.com/${origin.split('@github.com:')[1].replace('.git', '')}`
    : origin;
};

export const getCurrentBranchName = () => execSync('git rev-parse --abbrev-ref HEAD').toString().replace('\n', '');
