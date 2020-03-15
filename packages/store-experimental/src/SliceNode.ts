import { Observable } from 'rxjs';
import * as t from 'io-ts';
import { ConfigKey } from './config';

export class SliceNode<T extends t.Any> {
  constructor(
    protected $configKey: ConfigKey,
    public $type: T,
    public $: Observable<t.TypeOf<T>>,
  ) {}
}
