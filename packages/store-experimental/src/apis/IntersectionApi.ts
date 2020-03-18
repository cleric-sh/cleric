import { Tuple, Union } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { ApiTypeOf } from '.';
import * as t from 'io-ts';
import { ConfigKey } from '../config';
import { SliceApi } from './SliceApi';
import { decorateSlice } from '../decorateSlice';

export const isIntersectionType = (type: t.Any): type is t.IntersectionType<t.Any[]> =>
  type instanceof t.IntersectionType;

export const IntersectionApi = SliceApi(
  'Intersection',
  isIntersectionType,
  (configKey, type, slice) => {
    for (const subType of type.types) {
      decorateSlice(configKey, subType, slice);
    }
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
