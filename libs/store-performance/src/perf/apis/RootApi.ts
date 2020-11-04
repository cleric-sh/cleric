import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';
import {_Slice} from '@cleric/store-experimental/src/slice/Slice';

import {Root, root} from '../types/Root';

export const RootGuard = (type: t.Any): type is Root =>
  type instanceof t.RecursiveType && !!type.is(root);

export const RootApi = createApi('RootApi', RootGuard, slice => {
  slice['doRoot'] = () => 'Root';
});

declare module '@cleric/store-experimental/src/node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    RootApi: TType extends Root
      ? TType extends t.RecursiveType<infer C>
        ? C extends {
            props: t.AnyProps;
          }
          ? {
              [P in keyof t.PropsOf<C>]: _Slice<
                TConfigKey,
                TType,
                t.PropsOf<C>[P]
              >;
            }
          : never
        : never
      : never;
  }
}
