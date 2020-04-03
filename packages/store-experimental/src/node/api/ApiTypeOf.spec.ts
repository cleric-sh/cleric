import {Pass, check, checks} from '@cleric/common';
import {Compute} from 'Any/_api';
import '../../configs/test';
import {BarApi} from '../../configs/test/apis/BarApi';
import {FooApi} from '../../configs/test/apis/FooApi';
import {Bar} from '../../configs/test/types/Bar';
import {Foo} from '../../configs/test/types/Foo';
import {FooBar} from '../../configs/test/types/FooBar';
import {Unknown} from '../../configs/test/types/Unknown';
import {ApiTypeOf} from './ApiTypeOf';

describe('ApiTypeOf', () => {
  it('should return type of API when a single API matches', () => {
    type actualFoo = ApiTypeOf<'Test', typeof Foo>;
    type expectedFoo = FooApi<'Test', typeof Foo>;

    type actualBar = ApiTypeOf<'Test', typeof Bar>;
    type expectedBar = BarApi<'Test', typeof Bar>;

    checks([check<actualFoo, expectedFoo, Pass>()]);
    checks([check<actualBar, expectedBar, Pass>()]);
  });

  it('should return empty object when no API matches', () => {
    type actual = ApiTypeOf<'Test', typeof Unknown>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });

  it('should return merged object when more than one API matches', () => {
    type actual = ApiTypeOf<'Test', typeof FooBar>;
    type expected = Compute<
      FooApi<'Test', typeof Foo> & BarApi<'Test', typeof Bar>
    >;

    checks([check<actual, expected, Pass>()]);
  });
});
