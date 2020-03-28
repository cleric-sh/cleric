import {
  SliceParentProps
} from '@cleric/store-experimental/src/slice/node/SliceParentProps';
import {
  SliceParentType
} from '@cleric/store-experimental/src/slice/node/SliceParentType';
import * as t from 'io-ts';
import {pluck} from 'rxjs/operators';

import {ConfigKey} from '../../../config';
import {createApi} from '../../../node/api';
import {createSlice} from '../../../slice/createSlice';
import {Slice} from '../../../slice/Slice';

export type InterfaceApi<TConfigKey extends ConfigKey, T extends t.Any> =
    T extends SliceParentType
    ? {
  [K in keyof SliceParentProps<T>]:
      SliceParentProps<T>[ K ] extends t.Any ? Slice<TConfigKey, T, K>: never;
}
  : never;

  declare module '../../../node/api' {
    export interface ApiTypes<TConfigKey, TType> {
      Interface: InterfaceApi<TConfigKey, TType>;
    }
  }

  export const isInterfaceType =
      (type: t.Any): type is t.InterfaceType<t.Props> =>
          type instanceof t.InterfaceType;

  export const InterfaceApi =
      createApi('Interface', isInterfaceType, (configKey, type, slice) => {
        for (const name in type.props) {
          Object.defineProperty(slice, name, {
            get : () => {
              const _name = '__' + name;
              if (!slice[_name]) {
                slice[_name] = createSlice(slice, name);
              }
              return slice[_name];
            },
          });
        }
      });
