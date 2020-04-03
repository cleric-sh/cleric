import {Pass, check, checks} from '@cleric/common';
import * as t from 'io-ts';
import {ApiTypes} from '.';
import {Bar} from '../../configs/test/types/Bar';
import {Foo} from '../../configs/test/types/Foo';
import {FooBar} from '../../configs/test/types/FooBar';
import {MatchApiType} from './MatchApiType';

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
