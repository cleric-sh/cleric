import {Cast} from 'Any/Cast';
import * as t from 'io-ts';
import {Union, List} from 'ts-toolbelt';

import {ApiFor} from '../../../node/api';
import {createApi} from '../../../node/api';
import {decorateNode} from '../../../node/decorateNode';

declare module '../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Intersection: TType extends t.IntersectionType<infer CS>
      ? ApiFor<
          TConfigKey,
          Cast<t.InterfaceType<Union.IntersectOf<List.UnionOf<CS>>>, t.Any>
        >
      : never;
    // Intersection: never;
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
