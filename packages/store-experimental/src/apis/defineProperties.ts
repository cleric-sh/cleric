import { SliceApis } from '.';
import { pluck } from 'rxjs/operators';
import { createSlice } from '../createSlice';
import { Slice } from '../Slice';
import * as t from 'io-ts';

export const defineProperties = (
  apis: Readonly<SliceApis>,
  type: t.InterfaceType<t.Props, any, any, unknown>,
  slice: Slice<t.Any>,
) => {
  for (const name in type.props) {
    Object.defineProperty(slice, name, {
      get: () => {
        const _name = '__' + name;
        if (!slice[_name]) {
          const nextType = type.props[name];
          const next$ = slice.$.pipe(pluck(name));
          slice[_name] = createSlice(apis, nextType, next$);
        }
        return slice[_name];
      },
    });
  }
};
