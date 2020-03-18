import { Test } from '@cleric/common';
import { IsOr } from '@cleric/common/src/types';
import { List } from 'ts-toolbelt';

const { checks, check } = Test;

describe('List', () => {
  it('can ensure a list from single value or list', () => {
    type One = 'one';
    type Two = ['two'];

    type AsList<T> = IsOr<T, List.List, [T]>;

    checks([check<AsList<One>, [One], Test.Pass>()]);
    checks([check<AsList<Two>, Two, Test.Pass>()]);
  });
});
