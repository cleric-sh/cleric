import * as t from 'io-ts';

import {Union, List} from 'ts-toolbelt';

import {_ApiFor} from '../../../../node/api';
import {createApi} from '../../../../node/api';
import {decorateNode} from '../../../../node/decorateNode';
import {ConfigKey} from '../../../../config';
import {isIntersectionType} from './isIntersectionType';
import {Cast} from 'Any/Cast';
import {Compute} from 'Any/_api';

export type IntersectionApi<
  TConfigKey extends ConfigKey,
  TType extends t.Any
> = TType extends t.IntersectionType<infer CS>
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

declare module '../../../../node/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Intersection: IntersectionApi<TConfigKey, TType>;
  }
}

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
