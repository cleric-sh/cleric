import { ConfigKey } from '../config';
import { pluck } from 'rxjs/operators';
import { createSlice } from '../createSlice';
import { SliceNode } from '../SliceNode';
import * as t from 'io-ts';

export const defineProperties = (
  configKey: ConfigKey,
  type: t.InterfaceType<t.Props, any, any, unknown>,
  slice: SliceNode<t.Any>,
) => {
  for (const name in type.props) {
    Object.defineProperty(slice, name, {
      get: () => {
        const _name = '__' + name;
        if (!slice[_name]) {
          const nextType = type.props[name];
          const next$ = slice.$.pipe(pluck(name));
          slice[_name] = createSlice(nextType, next$, configKey);
        }
        return slice[_name];
      },
    });
  }
};
