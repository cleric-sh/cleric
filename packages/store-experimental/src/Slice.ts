import { Observable } from 'rxjs';
import * as t from 'io-ts';

export class Slice<T extends t.Any> {
  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {}
}
