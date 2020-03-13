import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { createSlice } from './createSlice';
import * as t from 'io-ts';

export class Slice<T extends t.Any> {
  constructor(public $type: T, public $: Observable<t.TypeOf<T>>) {}

  static resolver: () => string = () => 'Slice';

  protected createProperties = (type: t.InterfaceType<t.Any>) => {
    for (const name in type.props) {
      Object.defineProperty(this, name, {
        get: () => {
          const _name = '__' + name;
          if (!this[_name]) {
            const nextType = type.props[name];
            const next$ = this.$.pipe(pluck(name));
            this[_name] = createSlice(nextType, next$);
          }
          return this[_name];
        },
      });
    }
  };
}
