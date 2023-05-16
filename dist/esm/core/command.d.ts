import { Context } from './context';
declare type Args = any;
export declare type Middleware<T> = (context: T) => void | Promise<void>;
export declare type Command<T extends Context = Context> = {
    createContext: (args: Args) => T;
    process: Middleware<T>[];
    postProcess?: Middleware<T>[];
};
export default function execute<T extends Context = Context>(command: Command<T>, args: Args, allowExit?: boolean): Promise<void>;
export {};
