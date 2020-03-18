import { Test } from '../ts-toolbelt/Test';
import { AsList } from './AsList';

const { checks, check } = Test;

describe('List', () => {
  it('can ensure a list from single value or list', () => {
    type One = 'one';
    type Two = ['two'];

    checks([check<AsList<One>, [One], Test.Pass>()]);
    checks([check<AsList<Two>, Two, Test.Pass>()]);
  });
});
