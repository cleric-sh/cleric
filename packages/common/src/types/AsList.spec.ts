import {Pass, check, checks} from '../ts-toolbelt/Test';
import {AsList} from './AsList';

describe('List', () => {
  it('can ensure a list from single value or list', () => {
    type One = 'one';
    type Two = ['two'];

    checks([check<AsList<One>, [One], Pass>()]);
    checks([check<AsList<Two>, Two, Pass>()]);
  });
});
