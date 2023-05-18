test('cli', () => {
  const originalArgv = process.argv;
  const exitSpy = jest.spyOn(process, 'exit').mockImplementation(() => undefined as never);
  const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

  process.argv = ['node', 'index.ts', 'help'];
  require('../cli');
  process.argv = originalArgv;

  expect(exitSpy).toBeCalledWith(0);
  expect(consoleSpy).toBeCalled();
});
