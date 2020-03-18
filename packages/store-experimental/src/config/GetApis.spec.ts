/* eslint-disable sonarjs/no-duplicate-string */
import { Test } from '@cleric/common';
import { GetApis } from '.';
import { Any, List, Union } from 'ts-toolbelt';
import { Configs } from './Configs';

const { checks, check } = Test;

describe('GetApis', () => {
  it('Returns APIs corresponding to key.', () => {
    type AsTuple<L extends List.List<any>> = L extends List.List<infer L>
      ? Union.ListOf<L>
      : never;

    type actual = GetApis<'Default'>;
    type expected = AsTuple<NonNullable<typeof Configs['Default']>['apis']>;

    checks([check<Any.Extends<actual, expected>, 1, Test.Pass>()]);
    checks([check<actual, expected, Test.Pass>()]);
  });
});
