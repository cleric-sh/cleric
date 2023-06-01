import get from 'lodash.get';
import {Misc} from 'ts-toolbelt';
import {readJsonConfigFile} from '../utils/readJsonConfigFile';
import {ISource} from './index';

export class ConfigFileSource implements ISource {
  private readonly configFile: Misc.JSON.Object;

  constructor(private readonly configurationFilePath: string) {
    this.configFile = readJsonConfigFile(configurationFilePath);
  }

  get(configObject: Object, ...path: string[]): Misc.JSON.Value {
    return get(this.configFile, path);
  }
}
