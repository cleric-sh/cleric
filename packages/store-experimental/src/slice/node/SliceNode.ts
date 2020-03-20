import { Observable } from 'rxjs';
import * as t from 'io-ts';
import { ConfigKey } from '../../config';
import { decorateSlice } from './decorateSlice';

export class SliceNode<T extends t.Any> {
  constructor(
    public $type: T,
    public $: Observable<t.TypeOf<T>>,
    public $configKey: ConfigKey = 'Default',
  ) {
    decorateSlice($configKey, $type, this);
  }
}
