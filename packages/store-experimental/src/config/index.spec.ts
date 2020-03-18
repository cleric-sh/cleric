/* eslint-disable sonarjs/no-duplicate-string */
import { Test } from '@cleric/common';
import { GetApis, Config, Configs, AsTuple } from '.';
import { DefaultConfig } from './default';
import { Any } from 'ts-toolbelt';
import * as t from 'io-ts';

const { checks, check } = Test;

describe('t.InterfaceType', () => {
  it('is assignable to Any', () => {
    checks([check<Any.Extends<t.InterfaceType<t.Any>, t.Any>, 1, Test.Pass>()]);
  });
});

describe('t.IntersectionType', () => {
  it('is assignable to Any', () => {
    checks([check<Any.Extends<t.IntersectionType<t.Any[]>, t.Any>, 1, Test.Pass>()]);
  });
});

describe('t.UnionType', () => {
  it('is assignable to Any', () => {
    checks([check<Any.Extends<t.UnionType<t.Any[]>, t.Any>, 1, Test.Pass>()]);
  });
});

describe('Config', () => {
  it('Default configuration is assignable to Config interface', () => {
    type actual = typeof DefaultConfig;
    type expected = Config;

    checks([check<Any.Extends<actual, expected>, 1, Test.Pass>()]);
  });
});

describe('GetApis', () => {
  it('Returns APIs corresponding to key.', () => {
    type actual = GetApis<'Default'>;
    type expected = AsTuple<NonNullable<typeof Configs['Default']>['apis']>;

    checks([check<Any.Extends<actual, expected>, 1, Test.Pass>()]);
    checks([check<actual, expected, Test.Pass>()]);
  });
});
