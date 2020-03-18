import { SliceApi } from './SliceApi';
import * as t from 'io-ts';
import { ConfigKey } from '../config';
import { Slice } from '.';
import { createSlice } from '../createSlice';
import { pluck } from 'rxjs/operators';

export const hasProps = (type: t.Any): type is t.InterfaceType<t.Props> => !!type['props'];

export const InterfaceApi = SliceApi('Interface', hasProps, (configKey, type, slice) => {
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
});

export type InterfaceApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.InterfaceType<infer P>
  ? {
      [K in keyof P]: P[K] extends t.Any ? Slice<TConfigKey, P[K]> : never;
    }
  : never;

declare module '.' {
  export interface ApiTypes<TConfigKey, TType> {
    Interface: InterfaceApi<TConfigKey, TType>;
  }
}
