import { Observable } from 'rxjs';
import { isArray } from 'lodash';
import { Slice } from './Slice';
import * as t from 'io-ts';

export class IntersectionSlice<T extends t.IntersectionType<any>> extends Slice<T> {
  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {
    super($type, $);
    if (!isArray(this.$type.types)) throw 'This should never happen...';
    for (const subType of this.$type.types) {
      this.createProperties(subType);
    }
  }
}
