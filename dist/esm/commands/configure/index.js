import createContext from './context';
import configure from './middlewares/configure';
export default {
    createContext,
    process: [configure]
};
