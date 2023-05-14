import createContext from './context';
import init from './middlewares/init';
import repository from './middlewares/repository';
import analyze from './middlewares/analyze';
import result from './middlewares/result';
import write from './middlewares/write';
import report from './middlewares/report';
import clean from './middlewares/clean';
import success from './middlewares/success';

export default {
  createContext,
  process: [init, repository, analyze, result, write, report, success],
  postProcess: [clean]
};
