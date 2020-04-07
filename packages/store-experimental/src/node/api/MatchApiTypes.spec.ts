import '../../configs/test';

import {Pass, check, checks} from '@cleric/common';

import {ApiTypes} from '.';
import {MatchApiTypes} from './MatchApiTypes';

import {foo} from '../../configs/test/types/Foo';
import {fooBar} from '../../configs/test/types/FooBar';
import {unknown} from '../../configs/test/types/Unknown';

describe('MatchApiTypes', () => {
  it('should return all APIs that type guard matches', () => {
    type actual = MatchApiTypes<'Test', typeof fooBar>;
    type expected = [
      ApiTypes<'Test', typeof fooBar>['FooApi'],
      ApiTypes<'Test', typeof fooBar>['BarApi']
    ];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return API for type when type guard matches, otherwise never', () => {
    type actual = MatchApiTypes<'Test', typeof foo>;
    type expected = [ApiTypes<'Test', typeof foo>['FooApi'], never];

    checks([check<actual, expected, Pass>()]);
  });

  it('should return nevers when no APIs match any type guards', () => {
    type actual = MatchApiTypes<'Test', typeof unknown>;
    type expected = [never, never];

    checks([check<actual, expected, Pass>()]);
  });
});
