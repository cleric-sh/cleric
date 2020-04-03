import * as t from 'io-ts';

import {Observable} from 'rxjs';

import {ConfigKey} from '../../config';
import {ApiNode} from '../../node/ApiNode';

export type $Selector<P extends t.Any, T extends t.Any> = (
  parent: Observable<t.TypeOf<P>>
) => Observable<t.TypeOf<T>>;

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
    private readonly selector: $Selector<P, T>
  ) {
    super($parent.$configKey, $type);
  }
}
