import * as fs from 'fs';
import { execSync } from 'child_process';
import { sourceRepositoryToUrl, getCurrentBranchName } from '../../../core/repository';
import { moveTo } from '../../../core/process';
const conflictMessage = `
### :warning: CONFLICT

> This elements cannot be sync because they have been changed compared to open-stack version you are using.
> We strongly recommand you to update theses elements manually by comparing them with new version.

`;
const dependencyLink = (name) => `https://www.npmjs.com/package/${name}`;
const getDependencyVersion = (dir, section, target) => {
    const backToPreviousDir = moveTo(dir);
    const version = execSync(`npm pkg get ${section}.${target}`).toString().replace(/\n|"/g, '');
    backToPreviousDir();
    return version === '{}' ? 'none' : version;
};
const buildMardownPkgSection = ({ analyze, tmp, prevVersion, nextVersion }, { openStackRepo, currRepository, currBranch }) => {
    const pkg = analyze.package;
    let report = '';
    Object.keys(pkg).forEach((section) => {
        report += `\n## ${section}\n`;
        Object.keys(pkg[section])
            .filter((status) => pkg[section][status].length > 0)
            .forEach((status) => {
            if (status === 'CONFLICT') {
                report += conflictMessage;
                pkg[section][status].forEach((el) => {
                    const prevLink = `${openStackRepo}/tree/${prevVersion}/package.json`;
                    const nextLink = `${openStackRepo}/tree/${nextVersion}/package.json`;
                    const currLink = `${currRepository}/tree/${currBranch}/package.json`;
                    if (['dependencies', 'devDependencies', 'peerDependencies'].includes(section)) {
                        report += `  - [${el}](${dependencyLink(el)})\n`;
                        report += `    - [previous](${prevLink}) \`${getDependencyVersion(tmp.prev, section, el)}\`\n`;
                        report += `    - [current](${currLink}) \`${getDependencyVersion('.', section, el)}\`\n`;
                        report += `    - [next](${nextLink}) \`${getDependencyVersion(tmp.next, section, el)}\`\n`;
                    }
                    else {
                        report += `  - ${el} ([previous](${prevLink})) ([current](${currLink})) ([next](${nextLink})) \n`;
                    }
                });
                return;
            }
            report += `\n#### ${status}\n\n`;
            pkg[section][status].forEach((el) => {
                report += ['dependencies', 'devDependencies', 'peerDependencies'].includes(section)
                    ? `  - [${el}](${dependencyLink(el)})\n`
                    : `  - ${el}\n`;
            });
        });
    });
    return report;
};
const buildMardownFileSection = ({ analyze, prevVersion, nextVersion }, { openStackRepo, currRepository, currBranch }) => {
    const files = analyze.files;
    let report = '\n## Files\n';
    Object.keys(files).forEach((status) => {
        if (files[status].length === 0) {
            return;
        }
        if (status === 'CONFLICT') {
            report += conflictMessage;
            files[status].forEach((el) => {
                const prevLink = `${openStackRepo}/tree/${prevVersion}/${el}`;
                const nextLink = `${openStackRepo}/tree/${nextVersion}/${el}`;
                const currLink = `${currRepository}/tree/${currBranch}/${el}`;
                report += `  - ${el} ([previous](${prevLink})) ([current](${currLink})) ([next](${nextLink})) \n`;
            });
            return;
        }
        report += `\n#### ${status}\n\n`;
        files[status].forEach((el) => {
            report += `  - ${el}\n`;
        });
    });
    return report;
};
const buildMarkdownReport = (context) => {
    const { inputs, prevVersion, nextVersion } = context;
    const { repository, report } = inputs;
    const openStackRepo = sourceRepositoryToUrl(repository);
    const currRepository = sourceRepositoryToUrl();
    const currBranch = getCurrentBranchName();
    const prevUrl = `${openStackRepo}/releases/tag/${prevVersion}`;
    const nextUrl = `${openStackRepo}/releases/tag/${nextVersion}`;
    const links = `( [${prevVersion}](${prevUrl}) :arrow_right: [${nextVersion}](${nextUrl}) )`;
    let reportText = `# OpenStack update report ${links}\n\n`;
    reportText += `> Please check below the complete report which is a summary of changes made.\n`;
    reportText += `> It can help you to know what changes must be made manually.\n`;
    reportText += buildMardownPkgSection(context, { openStackRepo, currRepository, currBranch });
    reportText += buildMardownFileSection(context, { openStackRepo, currRepository, currBranch });
    reportText += `\n*This message has been auto generated*`;
    fs.writeFileSync(report, reportText);
};
const buildJsonReport = ({ inputs, analyze }) => {
    fs.writeFileSync(inputs.report, JSON.stringify(analyze));
};
const getReportType = (file) => (file.endsWith('.md') ? 'markdown' : 'json');
export default (context) => {
    const { inputs, logger } = context;
    const { report } = inputs;
    if (!report) {
        return;
    }
    logger.step('Create report file');
    switch (getReportType(report)) {
        case 'markdown':
            logger.info(`Build markdown report in ${report}`, 2);
            buildMarkdownReport(context);
            break;
        case 'json':
        default:
            logger.info(`Build json report in ${report}`, 2);
            buildJsonReport(context);
            break;
    }
};
