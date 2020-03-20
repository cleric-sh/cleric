import { Tuple, Union } from 'ts-toolbelt';
import { Cast } from 'Any/Cast';
import { ApiFor } from '../../../slice/api';
import * as t from 'io-ts';
import { ConfigKey } from '../../../config';
import { createApi } from '../../../slice/api';
import { decorateSlice } from '../../../slice/node/decorateSlice';

export type IntersectionApi<
  TConfigKey extends ConfigKey,
  T extends t.Any
  > = T extends t.IntersectionType<infer CS>
  ? Union.Merge<
    Tuple.UnionOf<
      {
        [K in keyof CS]: ApiFor<TConfigKey, Cast<CS[K], t.Any>>;
      }
    >
  >
  : never;

declare module '../../../slice/api' {
  export interface ApiTypes<TConfigKey, TType> {
    Intersection: IntersectionApi<TConfigKey, TType>;
  }
}

export const isIntersectionType = (type: t.Any): type is t.IntersectionType<t.Any[]> =>
  type instanceof t.IntersectionType;

export const IntersectionApi = createApi(
  'Intersection',
  isIntersectionType,
  (configKey, type, slice) => {
    for (const subType of type.types) {
      decorateSlice(configKey, subType, slice);
    }
  },
);
