import {Pass, check, checks} from '@cleric/common';
import {Any, List, Union, Object} from 'ts-toolbelt';
import {GetApis} from '.';
import {Configs} from './Configs';
import {Extends} from 'Any/Extends';
import {GetConfig} from './GetApis';
import {TestConfig, Foo, Bar, FooApi} from '../configs/test';
import {Config} from './Config';
import * as t from 'io-ts';
import {ApiDecorator} from '../node/api/ApiDecorator';
import {ApiDefinition, ApiLookup} from '../node/api/ApiDefinition';
import {ApiKey} from '../node/api/ApiKey';
import {MatchApiType} from '../node/api/MatchApiType';
import {ApiTypes} from '../node/api';
import {Compute, Cast} from 'Any/_api';
import {ApiGuard} from '../node/api/ApiGuard';
import {FooBar} from '../configs/test/types/FooBar';
import {Unknown} from '../configs/test/types/Unknown';
import {Merge} from 'List/_api';

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

    type ApiLookupsOf<
      TApis extends Array<ApiLookup<t.Any, ApiKey>>
    > = TApis extends Array<infer T>
      ? T extends ApiLookup<infer G, infer K>
        ? [t.TypeOf<G>, K]
        : never
      : never;

    type ConfigOut<TConfig extends Config> = {
      apis: ApiLookupsOf<TConfig['apis']>;
      slice: TConfig['slice'];
    };

    type ApiLookups = ConfigOut<typeof TestConfig>['apis'];

    checks([
      check<
        ApiLookups,
        [{foo: string}, 'FooApi'] | [{bar: number}, 'BarApi'],
        Pass
      >(),
    ]);

    type Select<L extends [unknown, string], U> = L extends [infer G, infer K]
      ? U extends G
        ? K
        : never
      : never;

    type FooMatch = Select<ApiLookups, t.TypeOf<typeof Foo>>;
    type BarMatch = Select<ApiLookups, t.TypeOf<typeof Bar>>;
    type FooBarMatch = Select<ApiLookups, t.TypeOf<typeof FooBar>>;
    type UnknownMatch = Select<ApiLookups, t.TypeOf<typeof Unknown>>;

    checks([
      check<FooMatch, 'FooApi', Pass>(),
      check<BarMatch, 'BarApi', Pass>(),
      check<FooBarMatch, 'FooApi' | 'BarApi', Pass>(),
      check<UnknownMatch, never, Pass>(),
    ]);

    type Out<TMatches extends ApiKey> = Union.Merge<
      TMatches extends infer K
        ? ApiTypes<'Test', typeof Foo>[Cast<K, ApiKey>]
        : never
    >;

    type FooOut = Out<FooMatch>;
    type BarOut = Out<BarMatch>;
    type FooBarOut = Out<FooBarMatch>;
    type UnknownOut = Out<UnknownMatch>;

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
