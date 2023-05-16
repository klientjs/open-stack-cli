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
const context_1 = require("./context");
const process_1 = require("./process");
function execute(command, args, allowExit = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let code = 0;
        let promise;
        const context = (0, context_1.default)(command, args);
        try {
            for (let i = 0, len = command.process.length; i < len; i += 1) {
                promise = command.process[i](context);
                if (promise instanceof Promise) {
                    yield promise;
                }
            }
        }
        catch (e) {
            code = 1;
            context.logger.error(e.message);
        }
        (0, process_1.resetCwd)();
        if (command.postProcess) {
            for (let i = 0, len = command.postProcess.length; i < len; i += 1) {
                command.postProcess[i](context);
            }
        }
        (0, process_1.resetCwd)();
        if (allowExit) {
            process.exit(code);
        }
    });
}
exports.default = execute;
