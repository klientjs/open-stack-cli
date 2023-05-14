declare const _default: {
    createContext: (inputs: import("./context").Inputs) => import("./context").Context;
    process: ((context: import("./context").Context) => void)[];
    postProcess: (({ tmp }: import("./context").Context) => void)[];
};
export default _default;
