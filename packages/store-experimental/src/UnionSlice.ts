import { Observable } from 'rxjs';
import { isArray } from 'lodash';
import { filter } from 'rxjs/operators';
import { SliceNode, createSlice } from './createSlice';
import { Slice } from './Slice';
import * as t from 'io-ts';

export class UnionSlice<T extends t.UnionType<t.Any[]>> extends Slice<T> {
  private nodeCreators: Array<() => SliceNode<any>>;

  private nodes: SliceNode<any>[] = [];

  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {
    super($type, $);
    if (!isArray(this.$type.types)) throw 'This should never happen...';
    for (const subType of this.$type.types) {
      if (subType instanceof t.InterfaceType) {
        this.createProperties(subType);
      }
    }
    this.nodeCreators = this.$type.types.map(t => () => {
      const option$ = $.pipe(filter(t.is));
      return createSlice(t, option$);
    });
  }

  $is = (type: t.Any) => {
    const index = this.$type.types.findIndex(t => t === type);
    if (index < 0) throw `Don't recognise this type...`;
    if (!this.nodes[index]) this.nodes[index] = this.nodeCreators[index]();
    return this.nodes[index];
  };
}
