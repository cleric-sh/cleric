import get from 'lodash.get';
import {Misc} from 'ts-toolbelt';
import {ISource} from '../../src/configuration/sources';

export class TestSource implements ISource {
  constructor(private settings: Misc.JSON.Object) {}

  get(configObject: Object, ...path: string[]): Misc.JSON.Value {
    return get(this.settings, path);
  }
}
