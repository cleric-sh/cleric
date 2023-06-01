import {formatEnvKey} from '../utils/formatEnvKey';
import {ISource} from './index';

export class ProcessEnvSource implements ISource {
  constructor(private readonly prefixPath: string[] = []) {}

  get(configObject: Object, ...path: string[]) {
    path = [...this.prefixPath, ...path];
    const key = path.map(formatEnvKey).join('__');
    return process.env[key];
  }
}
