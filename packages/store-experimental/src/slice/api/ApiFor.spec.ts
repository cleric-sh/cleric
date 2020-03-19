import { ApiFor } from './ApiFor';
import { checks, check, Pass } from '@cleric/common';
import '../../test';
import { FooApi, FooGuard } from '../../test/apis/FooApi';
import { Bar } from "../../test/types/Bar";
import { Unknown } from "../../test/types/Unknown";
import { Foo } from "../../test/types/Foo";
import { BarApi, BarGuard } from '../../test/apis/BarApi';
import { FooBar } from '../../test/types/FooBar';
import { Compute } from 'Any/_api';

describe('ApiFor', () => {
  it('should return type of API when a single API matches', () => {
    type actualFoo = ApiFor<'Test', typeof Foo>;
    type expectedFoo = FooApi<'Test', typeof Foo>;

    type actualBar = ApiFor<'Test', typeof Bar>;
    type expectedBar = BarApi<'Test', typeof Bar>;

    checks([check<actualFoo, expectedFoo, Pass>()]);
    checks([check<actualBar, expectedBar, Pass>()]);
  });

  it('should return empty object when no API matches', () => {
    type actual = ApiFor<'Test', typeof Unknown>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });

  it('should return merged object when more than one API matches', () => {

    type actual = ApiFor<'Test', typeof FooBar>;
    type expected = Compute<FooApi<'Test', typeof Foo> & BarApi<'Test', typeof Bar>>;

    checks([check<actual, expected, Pass>()]);
  });
});
