import * as t from 'io-ts';
import {Observable} from 'rxjs';

import {ConfigKey} from '../config';
import {ApiNode} from '../node/ApiNode';

export class StoreNode<TConfigKey extends ConfigKey, T extends t.Any> extends ApiNode<TConfigKey, T> {
  constructor(public $configKey: TConfigKey, public $type: T, public $: Observable<t.TypeOf<T>>) {
    super($configKey, $type);
  }
}
