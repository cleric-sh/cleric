import * as t from 'io-ts';
import { ApiTypes } from '.';
import { checks, check, Pass } from '@cleric/common';
import { MatchApiType } from './MatchApiType';
import { FooBar } from '../../test/types/FooBar';
import { Foo } from '../../test/types/Foo';
import { Bar } from '../../test/types/Bar';

describe('MatchApiType', () => {
  it('should return API for type when type guard is exactly type.', () => {
    type actual = MatchApiType<'Test', 'FooApi', typeof Foo, typeof Foo>;
    type expected = ApiTypes<'Test', typeof Foo>['FooApi'];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return API for type when type guard is supertype of type.', () => {
    type actual = MatchApiType<'Test', 'FooApi', typeof Foo, typeof FooBar>;
    type expected = ApiTypes<'Test', typeof FooBar>['FooApi'];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return never when type guard doesnt match', () => {
    type actual = MatchApiType<'Test', 'FooApi', typeof Foo, typeof Bar>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
