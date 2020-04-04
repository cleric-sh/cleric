import {Pass, check, checks} from '@cleric/common';
import {Any, List, Union} from 'ts-toolbelt';
import {GetApis} from '.';
import {Configs} from './Configs';
import {Extends} from 'Any/Extends';
import {GetConfig} from './GetApis';
import {TestConfig} from '../configs/test';
import {Config} from './Config';
import * as t from 'io-ts';
import {ApiDecorator} from '../node/api/ApiDecorator';
import {ApiDefinition} from '../node/api/ApiDefinition';
import {ApiKey} from '../node/api/ApiKey';
import {MatchApiType} from '../node/api/MatchApiType';
import {ApiTypes} from '../node/api';

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

    type ConfigOut<TConfig extends Config> = {
      apis: TConfig['apis'] extends Array<infer U> ? U : never;
      slice: TConfig['slice'];
    };

    type Apis = ConfigOut<typeof TestConfig>['apis'];

    // type Test<TApis extends ApiDefinition<ApiKey, any>, T extends t.Any> = {
    //   [K in keyof TApis]: TApis[K] extends ApiDefinition<infer K, infer G> ?
    //     t.TypeOf<T> extends t.TypeOf<G> ?
    //   : never;
    // };

    // type U = Test<Apis, t.Type<{}>>;

    checks([check<Extends<actual, expected>, 1, Pass>()]);
    checks([check<actual, expected, Pass>()]);
  });
});
