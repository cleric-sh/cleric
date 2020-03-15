import { Tuple, Union } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { SliceApi, SliceApis } from '.';
import { ApiTypeOf } from '.';
import * as t from 'io-ts';
import { Slice } from '../Slice';
import { isArray } from 'lodash';
import { decorateSlice } from '../decorateSlice';

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
  TSliceApis extends Readonly<SliceApis>,
  T extends t.Any
> = T extends t.IntersectionType<infer CS>
  ? Union.Merge<
      Tuple.UnionOf<
        {
          [K in keyof CS]: ApiTypeOf<TSliceApis, Cast<CS[K], t.Any>>;
        }
      >
    >
  : never;

declare module '.' {
  export interface ApiTypes<T, A> {
    Intersection: IntersectionApi<T, A>;
  }
}
