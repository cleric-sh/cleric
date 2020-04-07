import {ParentProps} from './ParentProps';
import {ParentType} from './ParentType';
import * as t from 'io-ts';
import {pluck} from 'rxjs/operators';

import {ConfigKey} from '../../../config';
import {createApi} from '../../../node/api';
import {_Slice} from '../../../slice/Slice';
import {createSlice} from '../../../slice/createSlice';

export type InterfaceApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends ParentType
  ? {
      [K in keyof ParentProps<T>]: ParentProps<T>[K] extends t.Any
        ? _Slice<TConfigKey, T, ParentProps<T>[K]>
        : never;
    }
  : never;

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Interface: InterfaceApi<TConfigKey, TType>;
  }
}

export const isInterfaceType = (
  type: t.Any
): type is t.InterfaceType<t.Props> => type instanceof t.InterfaceType;

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
