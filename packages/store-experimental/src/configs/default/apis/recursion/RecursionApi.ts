import * as t from 'io-ts';

import {createApi} from '@cleric/store-experimental/src/node/api';

import {_Slice} from '@cleric/store-experimental/src/slice/Slice';
import {decorateNode} from '../../../../node/decorateNode';
import {isRecursiveType} from './isRecursiveType';

declare module '../../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    RecursionApi: TType extends t.RecursiveType<infer C>
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
      : never;
  }
}

export const RecursionApi = createApi(
  'RecursionApi',
  isRecursiveType,
  (node, recursiveType) => {
    const type = recursiveType.runDefinition();
    decorateNode(node, type);
  }
);
