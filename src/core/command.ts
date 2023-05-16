import buildContext, { Context } from './context';
import { resetCwd } from './process';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Args = any;

export type Middleware<T> = (context: T) => void | Promise<void>;

export type Command<T extends Context = Context> = {
  createContext: (args: Args) => T;
  process: Middleware<T>[];
  postProcess?: Middleware<T>[];
};

export default async function execute<T extends Context = Context>(command: Command<T>, args: Args, allowExit = true) {
  let code = 0;
  let promise: Promise<unknown> | void;

  const context = buildContext(command, args);

  try {
    for (let i = 0, len = command.process.length; i < len; i += 1) {
      promise = command.process[i](context);
      if (promise instanceof Promise) {
        // eslint-disable-next-line no-await-in-loop
        await promise;
      }
    }
  } catch (e) {
    code = 1;
    context.logger.error((e as Error).message);
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
}
