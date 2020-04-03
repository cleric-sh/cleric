import {Pass, check, checks} from '@cleric/common';
import {Any, List, Union} from 'ts-toolbelt';
import {GetApis} from '.';
import {Configs} from './Configs';

describe('GetApis', () => {
  it('Returns APIs corresponding to key.', () => {
    type AsTuple<L extends List.List<any>> = L extends List.List<infer L>
      ? Union.ListOf<L>
      : never;

    type actual = GetApis<'Test'>;
    type expected = AsTuple<NonNullable<typeof Configs['Test']>['apis']>;

    checks([check<Any.Extends<actual, expected>, 1, Pass>()]);
    checks([check<actual, expected, Pass>()]);
  });
});
