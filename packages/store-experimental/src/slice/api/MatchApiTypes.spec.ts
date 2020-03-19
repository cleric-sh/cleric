import * as t from 'io-ts';
import { ApiTypes } from '.';
import { checks, check, Pass } from '@cleric/common';
import { MatchApiTypes } from './MatchApiTypes';
import { Foo } from '../../test/types/Foo';
import { FooBar } from '../../test/types/FooBar';
import { Unknown } from '../../test/types/Unknown';

const type = t.type({
  foo: t.string,
});

describe('MatchApiTypes', () => {
  it('should return all APIs that type guard matches', () => {
    type actual = MatchApiTypes<'Test', typeof FooBar>;
    type expected = [ApiTypes<'Test', typeof FooBar>['FooApi'], ApiTypes<'Test', typeof FooBar>['BarApi']];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return API for type when type guard matches, otherwise never', () => {
    type actual = MatchApiTypes<'Test', typeof Foo>;
    type expected = [ApiTypes<'Test', typeof Foo>['FooApi'], never];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return nevers when no APIs match any type guards', () => {
    type actual = MatchApiTypes<'Test', typeof Unknown>;
    type expected = [never, never];

    checks([check<actual, expected, Pass>()]);
  });
});
