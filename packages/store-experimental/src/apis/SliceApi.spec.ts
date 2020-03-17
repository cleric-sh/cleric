import * as t from 'io-ts';
import { SliceMixin } from './SliceApi';
import { checks, check, Fail } from 'Test';
import { Any } from 'ts-toolbelt';

describe('SliceMixin', () => {
  it('is not assignable to a SliceMixin of a supertype.', () => {
    type actual = SliceMixin<t.InterfaceType<t.Any>>;
    type base = SliceMixin<t.Any>;
    checks([check<Any.Extends<actual, base>, 1, Fail>()]);
  });
});
