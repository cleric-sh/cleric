import * as t from 'io-ts';

import {Observable} from 'rxjs';

import {ConfigKey} from '../../config';
import {ApiNode} from '../../node/ApiNode';
import {SliceSelector} from './SliceSelector';
import {registerSliceNode} from './registerSliceNode';

export class SliceNode<
  TConfigKey extends ConfigKey,
  P extends t.Any,
  T extends t.Any
> extends ApiNode<TConfigKey, T> {
  private _$?: Observable<t.TypeOf<T>>;

  get $(): Observable<t.TypeOf<T>> {
    if (!this._$) {
      this._$ = this.selector(this.$parent.$);
    }
    return this._$;
  }

  constructor(
    public readonly $parent: ApiNode<TConfigKey, P>,
    public readonly $type: T,
    private readonly selector: SliceSelector<P, T>
  ) {
    super($parent.$configKey, $type);
  }
}

registerSliceNode('SliceNode', SliceNode);
