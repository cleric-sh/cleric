import * as t from 'io-ts';

import {ConfigKey} from '@cleric/store-experimental';
import {_ApiFor, createApi} from '@cleric/store-experimental/src/node/api';
import {ApiTypes} from '@cleric/store-experimental/src/node/api/ApiTypes';
import {_Slice} from '@cleric/store-experimental/src/slice/Slice';
import {Root, root} from '../types/Root';

export const RootGuard = (type: t.Any): type is Root =>
  type instanceof t.RecursiveType && !!type.is(root);

export const RootApi = createApi('RootApi', RootGuard, slice => {
  slice['doRoot'] = () => 'Root';
});

type MapRootApi<
  TConfigKey extends ConfigKey,
  TType extends t.Any,
  PropsOfC extends t.AnyProps
> = {
  [P in keyof PropsOfC]: _Slice<TConfigKey, TType, PropsOfC[P]>;
};

export type RootApi<TConfigKey extends ConfigKey, TType> = TType extends Root
  ? TType extends t.RecursiveType<infer C>
    ? C extends {
        props: t.AnyProps;
      }
      ? {
          [P in keyof t.PropsOf<C>]: _Slice<TConfigKey, TType, t.PropsOf<C>[P]>;
        }
      : never
    : never
  : never;

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    RootApi: RootApi<TConfigKey, TType>;
  }
}
