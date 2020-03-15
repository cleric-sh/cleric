import { Tuple, Union } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { ApiTypeOf } from '.';
import * as t from 'io-ts';
// import { decorateSlice } from '../decorateSlice';
import { ConfigKey } from '../config';
import { SliceApi } from './SliceApi';
import { getMatchingApis } from '../getMatchingApis';
import { getSliceConstructor } from '../getSliceConstructor';

export const isIntersectionType = (type: t.Any): type is t.IntersectionType<t.Any[]> =>
  type instanceof t.IntersectionType;

export const IntersectionApi = SliceApi(
  'Intersection',
  isIntersectionType,
  (configKey, type, SliceNode) => {
    // eslint-disable-next-line sonarjs/prefer-immediate-return
    const IntersectionSlice = class extends SliceNode {};
    const apis = getMatchingApis(configKey, type.types);
    return getSliceConstructor(configKey, apis, type, IntersectionSlice);
    return IntersectionSlice;
  },
);

// export const IntersectionApi = SliceApi(
//   'Intersection',
//   isIntersectionType,
//   (apis, type, slice) => {
//     if (!isArray(type.types)) throw 'This should never happen...';
//     for (const subType of type.types) {
//       decorateSlice(apis, subType, slice);
//     }
//     return slice;
//   },
// );

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
