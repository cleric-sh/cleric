import {Pass, check, checks} from '@cleric/common';
import * as t from 'io-ts';
import {ApiTypes} from '.';
import {bar} from '../../configs/test/types/Bar';
import {foo} from '../../configs/test/types/Foo';
import {fooBar} from '../../configs/test/types/FooBar';
import {MatchApiType} from './MatchApiType';

describe('MatchApiType', () => {
  it('should return API for type when type guard is exactly type.', () => {
    type actual = MatchApiType<'Test', 'FooApi', typeof foo, typeof foo>;
    type expected = ApiTypes<'Test', typeof foo>['FooApi'];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return API for type when type guard is supertype of type.', () => {
    type actual = MatchApiType<'Test', 'FooApi', typeof foo, typeof fooBar>;
    type expected = ApiTypes<'Test', typeof fooBar>['FooApi'];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return never when type guard doesnt match', () => {
    type actual = MatchApiType<'Test', 'FooApi', typeof foo, typeof bar>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
