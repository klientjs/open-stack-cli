export default class Logger {
    private verbosity;
    private colors;
    constructor(verbosity?: number, colors?: boolean);
    write(x: string, minVerbosity: number): void;
    step(x: string, mv?: number): void;
    error(x: string, mv?: number): void;
    success(x: string, mv?: number): void;
    warn(x: string, mv?: number): void;
    info(x: string, mv?: number): void;
    infoTitle(x: string, mv?: number): void;
    infoSubTitle(x: string, mv?: number): void;
}
