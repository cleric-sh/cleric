import * as t from 'io-ts';
import { SliceNode } from '../SliceNode';
import { Union, List } from 'ts-toolbelt';
import { TypeError } from '@cleric/common';
import { ConfigKey, Configs } from '../config';

type SliceGuard<T extends t.Any> = (type: t.Any) => type is T;

type SliceDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: SliceNode<T>): SliceNode<T>;
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

export interface ApiTypes<TConfigKey extends ConfigKey, TType extends t.Any> {}

export type ApiKeys = keyof ApiTypes<any, any>;

export type SliceApis = SliceApi<ApiKeys, t.Any>[];

export type MatchApiKeys<TSliceApis extends Readonly<SliceApis>, T extends t.Any> = List.UnionOf<
  {
    [K in keyof TSliceApis]: TSliceApis[K] extends SliceApi<infer ApiKey, infer G>
      ? T extends G
        ? ApiKey
        : never
      : never;
  }
>;

export type MatchApiType<
  TConfigKey extends ConfigKey,
  K extends ApiKeys,
  G extends t.Any,
  T extends t.Any
> = T extends G ? ApiTypes<TConfigKey, T>[K] : never;

type ActualM = MatchApiType<
  'Default',
  'Interface',
  t.InterfaceType<t.AnyProps>,
  t.InterfaceType<t.AnyProps>
>;
// type ExpectedM = InterfaceApi<'Default', t.InterfaceType<t.AnyProps>>;
// Test.checks([Test.check<ActualM, ExpectedM, Test.Pass>()]);

type ApisFromConfig<
  TConfigKey extends ConfigKey,
  TConfig = Configs[TConfigKey]
> = TConfig extends Readonly<SliceApis>
  ? TConfig
  : TypeError<'Configuration must be a tuple of SliceApis.'>;

type IsOr<T, E, O> = T extends E ? T : O;

export type MatchApiTypes<
  TConfigKey extends ConfigKey,
  T extends t.Any,
  TConfig = ApisFromConfig<TConfigKey>
> = IsOr<
  {
    [K in keyof TConfig]: TConfig[K] extends SliceApi<infer ApiKey, infer G>
      ? MatchApiType<TConfigKey, ApiKey, G, T>
      : never;
  },
  List.List,
  []
>;

// type Actual = MatchApiTypes<ConfigKey, t.Any>;
// type Expected = List.List;
// checks([check<Actual, Expected, Test.Pass>()]);

export type ApiTypeOf<TConfigKey extends ConfigKey, T extends t.Any> = Union.Merge<
  List.UnionOf<MatchApiTypes<TConfigKey, T>>
>;

// const a: MatchApiTypes<ConfigKey, t.Any>;
// const t: List.List = a;
// checks([check<typeof a, typeof t, Test.Pass>()]);

export type Slice<TConfigKey extends ConfigKey, T extends t.Any> = SliceNode<T> &
  ApiTypeOf<TConfigKey, T>;
