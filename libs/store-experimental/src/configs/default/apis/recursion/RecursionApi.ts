import * as t from 'io-ts';

import {createApi} from '../../../../node/api';
import {decorateNode} from '../../../../node/decorateNode';
import {_Slice} from '../../../../slice/Slice';
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
