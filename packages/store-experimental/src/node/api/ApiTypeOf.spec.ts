import {Pass, check, checks} from '@cleric/common';
import {Compute} from 'Any/_api';
import '../../configs/test';
import {BarApi} from '../../configs/test/apis/BarApi';
import {FooApi} from '../../configs/test/apis/FooApi';
import {bar} from '../../configs/test/types/Bar';
import {foo} from '../../configs/test/types/Foo';
import {fooBar} from '../../configs/test/types/FooBar';
import {unknown} from '../../configs/test/types/Unknown';
import {ApiTypeOf} from './ApiTypeOf';

describe('ApiTypeOf', () => {
  it('should return type of API when a single API matches', () => {
    type actualFoo = ApiTypeOf<'Test', typeof foo>;
    type expectedFoo = FooApi<'Test', typeof foo>;

    type actualBar = ApiTypeOf<'Test', typeof bar>;
    type expectedBar = BarApi<'Test', typeof bar>;

    checks([check<actualFoo, expectedFoo, Pass>()]);
    checks([check<actualBar, expectedBar, Pass>()]);
  });

  it('should return empty object when no API matches', () => {
    type actual = ApiTypeOf<'Test', typeof unknown>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });

  it('should return merged object when more than one API matches', () => {
    type actual = ApiTypeOf<'Test', typeof fooBar>;
    type expected = Compute<
      FooApi<'Test', typeof foo> & BarApi<'Test', typeof bar>
    >;

    checks([check<actual, expected, Pass>()]);
  });
});
