import { Observable } from 'rxjs';
import { Slice } from './Slice';
import * as t from 'io-ts';

export class InterfaceSlice<T extends t.InterfaceType<any>> extends Slice<T> {
  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {
    super($type, $);
    this.createProperties($type);
  }

  static resolver: () => 'InterfaceSlice' = () => 'InterfaceSlice';
}
