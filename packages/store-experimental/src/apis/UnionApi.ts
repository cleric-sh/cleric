import { Tuple } from 'ts-toolbelt';
import { SliceApi, SliceApis } from '.';
import { ApisFor } from '.';
import * as t from 'io-ts';

export const isUnionType = (type: t.Any): type is t.UnionType<t.Any[]> =>
  type instanceof t.UnionType;

export const UnionApi = SliceApi('Union', isUnionType, (type, node) => node);

export type UnionApi<
  TSliceApis extends Readonly<SliceApis>,
  T extends t.Any
> = T extends t.UnionType<infer TCS>
  ? {
      $is: <TSubType extends Tuple.UnionOf<TCS>>(type: TSubType) => ApisFor<TSliceApis, TSubType>;
    }
  : never;

declare module '.' {
  export interface ApiTypes<T, A> {
    Union: UnionApi<T, A>;
  }
}
