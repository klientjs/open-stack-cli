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
const https = require("https");
const bagdeBuilderUrl = 'https://img.shields.io/badge';
const downloadBadge = (url, output) => new Promise((resolve, reject) => {
    const badge = fs.createWriteStream(output);
    https
        .get(url, (response) => {
        response.pipe(badge);
        badge.on('finish', () => {
            badge.close();
            resolve();
        });
    })
        .on('error', reject);
});
exports.default = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { logger, inputs } = context;
    const { input, output, label } = inputs;
    logger.step('Analyze coverage');
    logger.info(`Read ${input}`, 2);
    const coverageData = JSON.parse(fs.readFileSync(input).toString());
    const coverageMembers = Object.keys(coverageData.total).filter((n) => n !== 'branchesTrue');
    const coverageAmount = coverageMembers.map((n) => coverageData.total[n].pct).reduce((a, b) => a + b);
    const coverageValue = Math.round((coverageAmount / coverageMembers.length) * 100) / 100;
    coverageMembers.forEach((n) => logger.info(`- ${n}: ${coverageData.total[n].pct}%`, 2));
    logger.info('-----------------------', 2);
    logger.info(`TOTAL: ${coverageValue}%`, 2);
    let color = 'red';
    if (coverageValue >= 95) {
        color = 'brightgreen';
    }
    else if (coverageValue >= 90) {
        color = 'green';
    }
    else if (coverageValue >= 80) {
        color = 'lightgreen';
    }
    else if (coverageValue >= 70) {
        color = 'yellow';
    }
    else if (coverageValue >= 60) {
        color = 'orange';
    }
    logger.step('Create badge');
    const url = `${bagdeBuilderUrl}/${label}-${coverageValue}${encodeURI('%')}-${color}.svg`;
    logger.info(`Make request to ${url}`, 2);
    return downloadBadge(url, output).then(() => {
        logger.info(`Content uploaded in ${output}`, 2);
        logger.success('Successfully generated');
    });
});
