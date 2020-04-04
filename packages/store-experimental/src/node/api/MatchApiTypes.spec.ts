import '../../configs/test';

import {Pass, check, checks} from '@cleric/common';

import {ApiTypes} from '.';
import {MatchApiTypes} from './MatchApiTypes';

import {Foo} from '../../configs/test/types/Foo';
import {FooBar} from '../../configs/test/types/FooBar';
import {Unknown} from '../../configs/test/types/Unknown';

describe('MatchApiTypes', () => {
  it('should return all APIs that type guard matches', () => {
    type actual = MatchApiTypes<'Test', typeof FooBar>;
    type expected = [
      ApiTypes<'Test', typeof FooBar>['FooApi'],
      ApiTypes<'Test', typeof FooBar>['BarApi']
    ];

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
