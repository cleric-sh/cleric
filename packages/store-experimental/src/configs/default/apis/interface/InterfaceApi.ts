import * as t from 'io-ts';
import {pluck} from 'rxjs/operators';

import {ConfigKey} from '../../../../config';
import {createApi} from '../../../../node/api';
import {_Slice} from '../../../../slice/Slice';
import {createSlice} from '../../../../slice/createSlice';
import {isInterfaceType} from './isInterfaceType';

export const InterfaceApi = createApi(
  'Interface',
  isInterfaceType,
  (node, type) => {
    const subSlices = {};
    for (const name in type.props) {
      Object.defineProperty(node, name, {
        get: () => {
          const _name = '__' + name;
          if (!subSlices[_name]) {
            subSlices[_name] = createSlice(node, type.props[name], parent$ =>
              parent$.pipe(pluck(name))
            );
          }
          return subSlices[_name];
        },
      });
    }
  }
);

export type InterfaceApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.InterfaceType<infer P>
  ? {
      [K in keyof P]: P[K] extends t.Any ? _Slice<TConfigKey, T, P[K]> : never;
    }
  : never;

declare module '../../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Interface: InterfaceApi<TConfigKey, TType>;
  }
}
