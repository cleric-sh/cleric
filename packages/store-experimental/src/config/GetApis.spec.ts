import {Pass, check, checks} from '@cleric/common';
import {List, Union} from 'ts-toolbelt';
import {GetApis, ConfigKey} from '.';
import {Configs} from './Configs';
import {Extends} from 'Any/Extends';
import {GetConfig} from './GetApis';
import {TestConfig, Foo, Bar} from '../configs/test';
import {Config} from './Config';
import * as t from 'io-ts';
import {ApiLookup} from '../node/api/ApiDefinition';
import {ApiKey} from '../node/api/ApiKey';
import {ApiTypes} from '../node/api';
import {Cast} from 'Any/_api';
import {FooBar} from '../configs/test/types/FooBar';
import {Unknown} from '../configs/test/types/Unknown';

describe('GetApis', () => {
  it('Returns APIs corresponding to key.', () => {
    type AsTuple<L extends List.List<any>> = L extends List.List<infer L>
      ? Union.ListOf<L>
      : never;

    type actual = GetApis<'Test'>;
    type expected = AsTuple<NonNullable<typeof Configs['Test']>['apis']>;

    checks([check<Extends<actual, expected>, 1, Pass>()]);
    checks([check<actual, expected, Pass>()]);
  });
});

describe('GetConfig', () => {
  it('Returns APIs corresponding to key.', () => {
    type actual = GetConfig<'Test'>;
    type expected = typeof TestConfig;

    type ApiLookups = Config<typeof TestConfig>['_apiLookup'];

    checks([
      check<
        ApiLookups,
        [{foo: string}, 'FooApi'] | [{bar: number}, 'BarApi'],
        Pass
      >(),
    ]);

    type ApiKeysOf<
      TApiLookup extends [unknown, string],
      T
    > = TApiLookup extends [infer G, infer K]
      ? T extends G
        ? K
        : never
      : never;

    type FooMatch = ApiKeysOf<ApiLookups, t.TypeOf<typeof Foo>>;
    type BarMatch = ApiKeysOf<ApiLookups, t.TypeOf<typeof Bar>>;
    type FooBarMatch = ApiKeysOf<ApiLookups, t.TypeOf<typeof FooBar>>;
    type UnknownMatch = ApiKeysOf<ApiLookups, t.TypeOf<typeof Unknown>>;

    checks([
      check<FooMatch, 'FooApi', Pass>(),
      check<BarMatch, 'BarApi', Pass>(),
      check<FooBarMatch, 'FooApi' | 'BarApi', Pass>(),
      check<UnknownMatch, never, Pass>(),
    ]);

    type _ApiFor<
      TApiKeys extends ApiKey,
      TConfigKey extends ConfigKey,
      TNode extends t.Any
    > = Union.Merge<
      TApiKeys extends infer K
        ? ApiTypes<TConfigKey, TNode>[Cast<K, ApiKey>]
        : never
    >;

    type ApiFor<
      TApiKeys extends ApiKey,
      TConfigKey extends ConfigKey,
      TNode extends t.Any
    > = _ApiFor<TApiKeys, TConfigKey, TNode> extends infer X ? X : never;

    type FooOut = ApiFor<FooMatch, 'Test', typeof Foo>;
    type BarOut = ApiFor<BarMatch, 'Test', typeof Bar>;
    type FooBarOut = ApiFor<FooBarMatch, 'Test', typeof FooBar>;
    type UnknownOut = ApiFor<UnknownMatch, 'Test', typeof Unknown>;

    checks([
      check<FooOut, {doFoo: () => string}, Pass>(),
      check<BarOut, {doBar: () => string}, Pass>(),
      check<FooBarOut, {doFoo: () => string; doBar: () => string}, Pass>(),
      check<UnknownOut, {}, Pass>(),
    ]);

    checks([check<Extends<actual, expected>, 1, Pass>()]);
    checks([check<actual, expected, Pass>()]);
  });
});
