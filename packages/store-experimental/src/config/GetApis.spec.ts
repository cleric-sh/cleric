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

    checks([check<Extends<actual, expected>, 1, Pass>()]);
    checks([check<actual, expected, Pass>()]);
  });
});
