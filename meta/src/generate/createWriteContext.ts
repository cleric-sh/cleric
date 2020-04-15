import {WriteContext} from './WriteContext';
import {resolve} from '../util/resolve';

export const createWriteContext = (basePath: string): WriteContext => ({
  basePath: resolve(basePath),
  currentPath: '',
});
