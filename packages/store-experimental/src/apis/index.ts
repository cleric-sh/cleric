import * as t from 'io-ts';
import { Slice } from '../Slice';
import { Union, List } from 'ts-toolbelt';
import { InterfaceApi } from './InterfaceApi';
import { UnionApi } from './UnionApi';
import { IntersectionApi } from './IntersectionApi';

type SliceGuard<T extends t.Any> = (type: t.Any) => type is T;

type SliceDecorator<T extends t.Any> = {
  (apis: Readonly<SliceApis>, type: T, slice: Slice<T>): Slice<T>;
};

export interface SliceApi<TKey extends ApiKeys, T extends t.Any> {
  readonly key: TKey;
  readonly guard: SliceGuard<T>;
  readonly decorate: SliceDecorator<T>;
}

export const SliceApi = <TKey extends ApiKeys, T extends t.Any>(
  key: TKey,
  guard: SliceGuard<T>,
  decorator: SliceDecorator<T>,
): SliceApi<TKey, T> => ({ key, guard, decorate: decorator });

export interface Apis<T extends Readonly<SliceApis>, A extends t.Any> {}

export type ApiKeys = keyof Apis<any, any>;
export type ApiFor<T extends Readonly<SliceApis>, K extends ApiKeys, A extends t.Any> = Apis<
  T,
  A
>[K];

export type SliceApis = SliceApi<ApiKeys, t.Any>[];

export type MatchKeys<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = List.UnionOf<
  {
    [K in keyof TSliceApis]: TSliceApis[K] extends SliceApi<infer ApiKey, infer G>
      ? T extends G
        ? ApiKey
        : never
      : never;
  }
>;

export type MatchApi<
  TSliceApis extends Readonly<SliceApis>,
  K extends ApiKeys,
  G extends t.Any,
  T extends t.Any
> = T extends G ? ApiFor<TSliceApis, K, T> : never;

export type MatchApis<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = {
  [K in keyof TSliceApis]: TSliceApis[K] extends SliceApi<infer ApiKey, infer G>
    ? MatchApi<TSliceApis, ApiKey, G, T>
    : never;
};

export type ApisFor<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = Union.Merge<
  List.UnionOf<MatchApis<TSliceApis, T>>
>;

export type SliceNode<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = Slice<T> &
  ApisFor<TSliceApis, T>;
