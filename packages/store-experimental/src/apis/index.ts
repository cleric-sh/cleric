import * as t from 'io-ts';
import { SliceNode } from '../SliceNode';
import { Union, List } from 'ts-toolbelt';
import { ConfigKey, GetApis } from '../config';
import { SliceApi } from './SliceApi';

export interface ApiTypes<TConfigKey extends ConfigKey, TType extends t.Any> {}

export type ApiKey = keyof ApiTypes<any, any>;

export type MatchApiType<
  TConfigKey extends ConfigKey,
  K extends ApiKey,
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

type IsOr<T, E, O> = T extends E ? T : O;

export type MatchApiTypes<
  TConfigKey extends ConfigKey,
  T extends t.Any,
  TApis = GetApis<TConfigKey>
> = IsOr<
  {
    [K in keyof TApis]: TApis[K] extends SliceApi<infer ApiKey, infer G>
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
