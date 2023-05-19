"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const child_process_1 = require("child_process");
const pkg = {
    dependencies: {
        react: '^18.2.0'
    },
    devDependencies: {
        '@babel/preset-env': '^7.21.5',
        '@babel/preset-react': '^7.18.6',
        '@babel/preset-typescript': '^7.21.5',
        '@testing-library/jest-dom': '^5.16.5',
        '@testing-library/react': '^13.4.0',
        '@testing-library/user-event': '^13.5.0',
        '@types/react': '^18.2.6',
        '@types/react-dom': '^18.2.4',
        'eslint-config-airbnb': '^19.0.4',
        'react-dom': '^18.2.0'
    }
};
const removablePkgKeys = ['devDependencies.eslint-config-airbnb-base'];
const eslintConfigExtends = [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
    'prettier'
];
const babelConfig = {
    presets: ['@babel/preset-env', '@babel/preset-typescript', '@babel/preset-react']
};
const jestConfig = {
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect']
};
exports.default = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger, inputs } = context;
    const { dir, lib } = inputs;
    if (lib !== 'react') {
        return;
    }
    if (dir !== '.') {
        logger.step('Move to target dir');
        process.chdir(dir);
        logger.info(`Moved to ${dir}`, 2);
    }
    logger.step('Update package.json');
    removablePkgKeys.forEach((key) => (0, child_process_1.execSync)(`npm pkg delete ${key}`));
    Object.keys(pkg).forEach((section) => {
        logger.info(`Setup ${section}`, 2);
        Object.keys(pkg[section]).forEach((key) => {
            (0, child_process_1.execSync)(`npm pkg set ${section}.${key}="${pkg[section][key]}"`);
        });
    });
    logger.step('Update files');
    logger.info('Create .babelrc', 2);
    fs.writeFileSync('.babelrc', JSON.stringify(babelConfig, null, 2));
    logger.info('Update .eslintrc', 2);
    const config = JSON.parse(fs.readFileSync('.eslintrc').toString());
    config.extends = eslintConfigExtends;
    config.rules['import/extensions'] = 'off';
    fs.writeFileSync('.eslintrc', JSON.stringify(config, null, 2));
    logger.info('Update jest.config.json', 2);
    const jconfig = JSON.parse(fs.readFileSync('jest.config.json').toString());
    Object.keys(jestConfig).forEach((c) => {
        jconfig[c] = jestConfig[c];
    });
    fs.writeFileSync('jest.config.json', JSON.stringify(jconfig, null, 2));
    logger.info('Update tsconfig.json', 2);
    const tsconfig = JSON.parse(fs.readFileSync('tsconfig.json').toString());
    tsconfig.compilerOptions.esModuleInterop = true;
    tsconfig.compilerOptions.jsx = 'react';
    fs.writeFileSync('tsconfig.json', JSON.stringify(tsconfig, null, 2));
    logger.step('Install dependencies');
    (0, child_process_1.execSync)('npm install');
    logger.step('Run pre-commit script');
    (0, child_process_1.execSync)('npm run pre-commit');
    (0, child_process_1.execSync)('npm run prettier:fix -- jest.config.json');
    logger.success('Successfully setup');
});
