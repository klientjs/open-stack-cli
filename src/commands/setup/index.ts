import createContext from './context';
import experimental from './middlewares/experimental';
import reactApp from './middlewares/react-app';

export default {
  createContext,
  process: [experimental, reactApp]
};
