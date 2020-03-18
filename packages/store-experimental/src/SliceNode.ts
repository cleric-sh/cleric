import { Observable } from 'rxjs';
import * as t from 'io-ts';
import { ConfigKey } from './config';

export class SliceNode<T extends t.Any> {
  constructor(
    protected $configKey: ConfigKey,
    public $type: T,
    public $: Observable<t.TypeOf<T>>,
  ) {
    console.log('Constructing SliceNode.', $type, $);
    this.$type = $type;
    this.$ = $;
    this.$configKey = $configKey;
    console.log('SliceNode: ', this);
  }
}
