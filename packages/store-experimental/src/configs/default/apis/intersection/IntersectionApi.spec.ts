import * as t from 'io-ts';
import '../../index';

import {_Slice} from '../../../../slice/Slice';
import {Pass, checks, check} from '@cleric/common';
import {ApiTypes} from '../../../../node/api';
import {getConfig} from '../../../../config';

type IntersectionApi<T extends t.Any> = ApiTypes<'Default', T>['Intersection'];

describe('IntersectionApi', () => {
  it.only('should create a slice for each property on an object type', () => {
    const foo = t.type({foo: t.string});
    const bar = t.type({bar: t.number});
    const outer = t.intersection([foo, bar]);

    type actual = IntersectionApi<typeof outer>;

    type expected = {
      foo: _Slice<'Default', typeof foo, t.StringC>;
      bar: _Slice<'Default', typeof bar, t.NumberC>;
    };

    checks([check<actual, expected, Pass>()]);

    const config = getConfig('Default');
    console.log(config);
  });

  it('should create no properties on empty object type', () => {
    const outer = t.type({});

    type actual = IntersectionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a scalar type', () => {
    const outer = t.string;

    type actual = IntersectionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a union type', () => {
    const outer = t.union([t.type({}), t.type({})]);

    type actual = IntersectionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match an interface type', () => {
    const outer = t.type({});

    type actual = IntersectionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
