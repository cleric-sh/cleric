import { Observable, from } from 'rxjs';
import * as t from 'io-ts';
import { ConfigKey } from '../../config';
import { decorateNode } from './decorateNode';
import { FooBar } from '../../configs/test/types/FooBar';
import { pluck } from 'rxjs/internal/operators/pluck';

export abstract class ApiNode<TConfigKey extends ConfigKey, T extends t.Any> {

  abstract get $(): Observable<t.TypeOf<T>>;

  constructor(
    public $configKey: TConfigKey,
    public $type: T,
  ) {
    decorateNode($configKey, $type, this);
  }
}
export type SliceParentType = t.InterfaceType<t.Props>;

export type SliceParentProps<T extends SliceParentType> = T extends t.InterfaceType<infer P> ? P : never;

export class SliceNode<
  TConfigKey extends ConfigKey,
  P extends SliceParentType,
  K extends keyof SliceParentProps<P>
  >
  extends ApiNode<TConfigKey, SliceParentProps<P>[K]>
{
  private _$?: Observable<SliceParentProps<P>[K]>;

  get $() {
    if (!this._$) {
      this._$ = this.$parent.$.pipe(pluck(this.$name));
    }
    return this._$;
  }

  constructor(
    public $parent: ApiNode<TConfigKey, P>,
    public $name: K
  ) {
    super($parent.$configKey, ($parent.$type.props as SliceParentProps<P>)[$name]);
  }
}

export class StoreNode<TConfigKey extends ConfigKey, T extends t.Any> extends ApiNode<TConfigKey, T> {

  constructor(
    public $configKey: TConfigKey,
    public $type: T,
    public $: Observable<t.TypeOf<T>>
  ) {
    super($configKey, $type);
  }
}

const parent = new StoreNode('Test', FooBar, from([]));
const slice = new SliceNode(parent, 'foo');