import {resolve} from '../util/resolve';
import {WriteContext} from './WriteContext';

export const createWriteContext = (basePath: string): WriteContext => ({
  basePath: resolve(basePath),
  currentPath: '',
});
