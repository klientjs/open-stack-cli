declare const _default: {
    createContext: (inputs: import("./context").Inputs) => import("./context").Context;
    process: (({ logger, inputs }: import("./context").Context) => Promise<void>)[];
};
export default _default;
