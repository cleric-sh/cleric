import { Observable } from 'rxjs';
import { ConfigKey } from '../../config';
import { pluck } from 'rxjs/internal/operators/pluck';
import { ApiNode } from '../../node/ApiNode';
import { SliceParentType } from './SliceParentType';
import { SliceParentProps } from './SliceParentProps';

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

