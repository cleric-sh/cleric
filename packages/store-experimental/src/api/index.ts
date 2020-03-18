import * as t from 'io-ts';
import { SliceNode } from '../SliceNode';
import { Union, List } from 'ts-toolbelt';
import { ConfigKey, GetApis } from '../config';
import { ApiDefinition } from './createApi';
import { TError } from '@cleric/common';

export interface ApiTypes<TConfigKey extends ConfigKey, TType extends t.Any> {}

export type ApiKey = keyof ApiTypes<any, any>;

export type MatchApiType<
  TConfigKey extends ConfigKey,
  K extends ApiKey,
  G extends t.Any,
  T extends t.Any
> = T extends G ? ApiTypes<TConfigKey, T>[K] : never;

// type ExpectedM = InterfaceApi<'Default', t.InterfaceType<t.AnyProps>>;
// Test.checks([Test.check<ActualM, ExpectedM, Test.Pass>()]);

export type MatchApiTypes<
  TConfigKey extends ConfigKey,
  T extends t.Any,
  TApis = GetApis<TConfigKey>
> = TApis extends TError<infer M>
  ? TError<M>
  : {
      [K in keyof TApis]: TApis[K] extends ApiDefinition<infer ApiKey, infer G>
        ? MatchApiType<TConfigKey, ApiKey, G, T>
        : never;
    };

// type Actual = MatchApiTypes<ConfigKey, t.Any>;
// type Expected = List.List;
// checks([check<Actual, Expected, Test.Pass>()]);

export type ApiFor<TConfigKey extends ConfigKey, T extends t.Any> = Union.Merge<
  List.UnionOf<MatchApiTypes<TConfigKey, T>>
>;

// const a: MatchApiTypes<ConfigKey, t.Any>;
// const t: List.List = a;
// checks([check<typeof a, typeof t, Test.Pass>()]);

export type Slice<TConfigKey extends ConfigKey, T extends t.Any> = SliceNode<T> &
  ApiFor<TConfigKey, T>;
