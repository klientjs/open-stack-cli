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
const supportedLibs = ['react-app'];
exports.default = ({ logger, inputs }) => __awaiter(void 0, void 0, void 0, function* () {
    logger.warn('CAUTION You are using an experimental feature');
    if (!supportedLibs.includes(inputs.lib)) {
        throw new Error(`Supported libs are : ${supportedLibs.join(', ')}`);
    }
});
