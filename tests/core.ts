import { stdout } from 'process';

let originalArgv = process.argv;
let code: number = 0;

const createExitMock = () =>
  jest.spyOn(process, 'exit').mockImplementation((exitCode = 0) => {
    code = exitCode;
    return undefined as never;
  });

beforeEach(() => {
  // Remove all cached modules. The cache needs to be cleared before running
  // each command, otherwise you will see the same results from the command
  // run in your first test in subsequent tests.
  jest.resetModules();

  // Each test overwrites process arguments so store the original arguments
  originalArgv = process.argv;
  exitMock = createExitMock();
});

afterEach(() => {
  jest.resetAllMocks();

  // Set process arguments back to the original value
  process.argv = originalArgv;
});

export let exitMock = createExitMock();

export async function runCommand(...args: string[]): Promise<{ code: number; output: string }> {
  code = 0;
  process.argv = [
    'node', // Not used but a value is required at this index in the array
    'index.ts', // Not used but a value is required at this index in the array
    ...args
  ];

  let output: string[] = [];

  jest.spyOn(stdout, 'write').mockImplementation((content: unknown) => {
    if (typeof content === 'string') {
      // Do not trim content which starts intentionally with spaces
      content = !content.startsWith('   ') ? content.trim() : content.replace('\n', '');
      output.push(content as string);
    }

    return true;
  });

  const parser = require('../src').default;

  return await new Promise((resolve) => {
    parser.parse(args, () => {
      resolve({ code, output: output.join('\n') });
    });
  });
}

export const fakeBuffer = (val: string) => ({
  toString() {
    return val;
  }
});
