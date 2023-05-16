var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import buildContext from './context';
import { resetCwd } from './process';
export default function execute(command, args, allowExit = true) {
    return __awaiter(this, void 0, void 0, function* () {
        let code = 0;
        let promise;
        const context = buildContext(command, args);
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
        resetCwd();
        if (command.postProcess) {
            for (let i = 0, len = command.postProcess.length; i < len; i += 1) {
                command.postProcess[i](context);
            }
        }
        resetCwd();
        if (allowExit) {
            process.exit(code);
        }
    });
}
