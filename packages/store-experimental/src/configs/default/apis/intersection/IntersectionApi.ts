import * as t from 'io-ts';

import {Cast, Compute} from 'Any/_api';
import {List, Union} from 'ts-toolbelt';

import {_ApiFor} from '../../../../node/api';
import {createApi} from '../../../../node/api';
import {decorateNode} from '../../../../node/decorateNode';
import {isIntersectionType} from './isIntersectionType';

declare module '../../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Intersection: TType extends t.IntersectionType<infer CS>
      ? Compute<
          Union.IntersectOf<
            List.UnionOf<
              {
                [K in keyof CS]: _ApiFor<TConfigKey, Cast<CS[K], t.Any>>;
              }
            >
          >
        >
      : never;
  }
}

export const IntersectionApi = createApi(
  'Intersection',
  isIntersectionType,
  (node, type) => {
    console.log(type.types);
    for (const subType of type.types) {
      // This might be a bad idea. Probably more intuitive to run the decorators on the merged type as one.
      decorateNode(node, subType);
    }
  }
);
