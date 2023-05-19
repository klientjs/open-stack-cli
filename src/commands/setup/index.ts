import createContext from './context';
import experimental from './middlewares/experimental';
import reactApp from './middlewares/react-app';
import react from './middlewares/react';

export { supportedLibs } from './context';

export default {
  createContext,
  process: [experimental, reactApp, react]
};
