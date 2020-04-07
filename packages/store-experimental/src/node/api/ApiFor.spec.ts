import {Pass, check, checks} from '@cleric/common';
import {Compute} from 'Any/_api';
import '../../configs/test';
import {Bar} from '../../configs/test/types/Bar';
import {Foo} from '../../configs/test/types/Foo';
import {FooBar} from '../../configs/test/types/FooBar';
import {Unknown} from '../../configs/test/types/Unknown';
import {ApiFor} from './ApiFor';
import {ApiTypes} from './ApiTypes';

describe('ApiFor', () => {
  type FooApi = ApiTypes<'Test', Foo>['FooApi'];
  type BarApi = ApiTypes<'Test', Bar>['BarApi'];

  it('should return type of API when a single API matches', () => {
    type actualFoo = ApiFor<'Test', Foo>;
    type expectedFoo = FooApi;

    type actualBar = ApiFor<'Test', Bar>;
    type expectedBar = BarApi;

    checks([check<actualFoo, expectedFoo, Pass>()]);
    checks([check<actualBar, expectedBar, Pass>()]);
  });

  it('should return empty object when no API matches', () => {
    type actual = ApiFor<'Test', Unknown>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });

  it('should return merged object when more than one API matches', () => {
    type actual = ApiFor<'Test', FooBar>;
    type expected = Compute<FooApi & BarApi>;

    checks([check<actual, expected, Pass>()]);
  });
});
