import {Pass, check, checks, checkExtends} from '@cleric/common';
import {List, Union} from 'ts-toolbelt';
import {GetApis, ConfigKey} from '.';
import {Configs} from './Configs';
import {Extends} from 'Any/Extends';
import {GetConfig} from './GetApis';
import {TestConfig, Foo, Bar} from '../configs/test';

import * as t from 'io-ts';

import {ApiKey} from '../node/api/ApiKey';
import {ApiTypes} from '../node/api';
import {Cast} from 'Any/_api';
import {FooBar} from '../configs/test/types/FooBar';
import {Unknown} from '../configs/test/types/Unknown';
import {Config} from './Config';

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

    // checks([check<ApiLookups, [Foo, 'FooApi'] | [Bar, 'BarApi'], Pass>()]);

    // type ApiKeysOf<
    //   TApiLookup extends [unknown, string],
    //   T
    // > = TApiLookup extends [infer G, infer K]
    //   ? T extends G
    //     ? K
    //     : never
    //   : never;

    // type FooMatch = ApiKeysOf<ApiLookups, Foo>;
    // type BarMatch = ApiKeysOf<ApiLookups, Bar>;
    // type FooBarMatch = ApiKeysOf<ApiLookups, FooBar>;
    // type UnknownMatch = ApiKeysOf<ApiLookups, Unknown>;

    // checks([
    //   check<FooMatch, 'FooApi', Pass>(),
    //   check<BarMatch, 'BarApi', Pass>(),
    //   check<FooBarMatch, 'FooApi' | 'BarApi', Pass>(),
    //   check<UnknownMatch, never, Pass>(),
    // ]);

    type _ApiFor<
      TConfigKey extends ConfigKey,
      TNode extends t.Any
    > = Union.Merge<
      GetConfig<TConfigKey>['_apiLookup'] extends infer K
        ? ApiTypes<TConfigKey, TNode>[Cast<K, ApiKey>]
        : never
    >;

    type apis = GetConfig<'Test'>['apis'];

    type ApiFor<TConfigKey extends ConfigKey, TNode extends t.Any> = _ApiFor<
      TConfigKey,
      TNode
    > extends infer X
      ? X
      : never;

    type FooOut = ApiFor<'Test', Foo>;
    type BarOut = ApiFor<'Test', Bar>;
    type FooBarOut = ApiFor<'Test', FooBar>;
    type UnknownOut = ApiFor<'Test', Unknown>;

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
