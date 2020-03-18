/* eslint-disable sonarjs/no-duplicate-string */
import { Test } from '@cleric/common';
import { DefaultConfig } from './DefaultConfig';
import { Any } from 'ts-toolbelt';
import { Config } from '../config/Config';

const { checks, check } = Test;

describe('DefaultConfig', () => {
  it('Default configuration is assignable to Config interface', () => {
    type actual = typeof DefaultConfig;
    type expected = Config;

    checks([check<Any.Extends<actual, expected>, 1, Test.Pass>()]);
  });
});
