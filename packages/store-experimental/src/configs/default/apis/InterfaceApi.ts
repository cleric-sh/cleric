import { createApi } from '../../../slice/api';
import * as t from 'io-ts';
import { ConfigKey } from '../../../config';
import { createSlice } from '../../../slice/createSlice';
import { Slice } from '../../../slice/Slice';
import { pluck } from 'rxjs/operators';

export type InterfaceApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
  > = T extends t.InterfaceType<infer P>
  ? {
    [K in keyof P]: P[K] extends t.Any ? Slice<TConfigKey, P[K]> : never;
  }
  : never;

declare module '../../../slice/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Interface: InterfaceApi<TConfigKey, TType>;
  }
}

export const isInterfaceType = (type: t.Any): type is t.InterfaceType<t.Props> =>
  type instanceof t.InterfaceType;

export const InterfaceApi = createApi('Interface', isInterfaceType, (configKey, type, slice) => {
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
