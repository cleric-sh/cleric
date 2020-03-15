import { Tuple, Union } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { ApiTypeOf } from '.';
import * as t from 'io-ts';
import { isArray } from 'lodash';
import { decorateSlice } from '../decorateSlice';
import { ConfigKey } from '../config';
import { SliceApi } from './SliceApi';

export const isIntersectionType = (type: t.Any): type is t.IntersectionType<t.Any[]> =>
  type instanceof t.IntersectionType;

export const IntersectionApi = SliceApi(
  'Intersection',
  isIntersectionType,
  (apis, type, slice) => {
    if (!isArray(type.types)) throw 'This should never happen...';
    for (const subType of type.types) {
      decorateSlice(apis, subType, slice);
    }
    return slice;
  },
);

export type IntersectionApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = T extends t.IntersectionType<infer CS>
  ? Union.Merge<
      Tuple.UnionOf<
        {
          [K in keyof CS]: ApiTypeOf<TConfigKey, Cast<CS[K], t.Any>>;
        }
      >
    >
  : never;

declare module '.' {
  export interface ApiTypes<TConfigKey, TType> {
    Intersection: IntersectionApi<TConfigKey, TType>;
  }
}
