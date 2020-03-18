import { Tuple } from 'ts-toolbelt';
import { Slice } from '.';
import * as t from 'io-ts';
import { createSlice } from '../createSlice';
import { filter } from 'rxjs/operators';
import { ConfigKey } from '../config';
import { SliceApi } from './SliceApi';

export const isUnionType = (type: t.Any): type is t.UnionType<t.Any[]> =>
  type instanceof t.UnionType;

export const UnionApi = SliceApi('Union', isUnionType, (configKey, type, slice) => {
  const subSlices: Slice<ConfigKey, t.Any>[] = [];

  slice['$is'] = (guard: t.Any) => {
    const index = type.types.findIndex(t => t === guard);

    if (index < 0) throw `Don't recognise this type...`;

    const subType = type.types[index];

    if (!subSlices[index]) {
      const option$ = slice.$.pipe(filter(subType.is));
      subSlices[index] = createSlice(subType, option$, configKey);
    }

    return subSlices[index];
  };
});

export type UnionApi<TConfigKey extends ConfigKey, T extends t.Any> = T extends t.UnionType<
  infer TCS
>
  ? {
      $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => Slice<TConfigKey, TSubType>;
    }
  : never;

declare module '.' {
  export interface ApiTypes<TConfigKey, TType> {
    Union: UnionApi<TConfigKey, TType>;
  }
}
