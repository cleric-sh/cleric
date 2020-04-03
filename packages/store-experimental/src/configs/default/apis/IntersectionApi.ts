import {Cast} from 'Any/Cast';
import * as t from 'io-ts';
import {Tuple, Union} from 'ts-toolbelt';

import {ConfigKey} from '../../../config';
import {ApiFor} from '../../../node/api';
import {createApi} from '../../../node/api';
import {decorateNode} from '../../../node/decorateNode';

export type IntersectionApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.IntersectionType<infer CS>
  ? Union.Merge<
      Tuple.UnionOf<{[K in keyof CS]: ApiFor<TConfigKey, Cast<CS[K], t.Any>>}>
    >
  : never;

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Intersection: IntersectionApi<TConfigKey, TType>;
  }
}

export const isIntersectionType = (
  type: t.Any
): type is t.IntersectionType<t.Any[]> => type instanceof t.IntersectionType;

export const IntersectionApi = createApi(
  'Intersection',
  isIntersectionType,
  (node, type) => {
    for (const subType of type.types) {
      // This might be a bad idea. Probably more intuitive to run the decorators on the merged type as one.
      decorateNode(node, subType);
    }
  }
);
