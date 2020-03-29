import {checks, check, Pass} from '@cleric/common';
import {IsOr} from '@cleric/common/src/types';
import {List} from 'ts-toolbelt';

describe('List', () => {
  it('can ensure a list from single value or list', () => {
    type One = 'one';
    type Two = ['two'];

    type AsList<T> = IsOr<T, List.List, [T]>;

    checks([check<AsList<One>, [One], Pass>()]);
    checks([check<AsList<Two>, Two, Pass>()]);
  });
});
