import createContext from './context';
import create from './middlewares/create';
export default {
    createContext,
    process: [create]
};
