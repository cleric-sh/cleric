import * as t from 'io-ts';

import {_Slice} from '../../../../slice/Slice';
import {Pass, checks, check} from '@cleric/common';
import {ApiTypes} from '../../../../node/api';

type UnionApi<T extends t.Any> = ApiTypes<'Default', T>['Union'];

describe('UnionApi', () => {
  it('should create a slice for each property on an object type', () => {
    const foo = t.type({foo: t.string});
    const bar = t.type({bar: t.number});
    const fooBar = t.union([foo, bar]);

    type Foo = typeof foo;
    type Bar = typeof bar;
    type FooBar = typeof fooBar;

    type actual = UnionApi<FooBar>;

    type expected = {
      $is: <T extends Foo | Bar>(type: T) => _Slice<'Default', FooBar, T>;
    };

    checks([check<actual, expected, Pass>()]);
  });

  it('should create no properties on empty object type', () => {
    const outer = t.type({});

    type actual = UnionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a scalar type', () => {
    const outer = t.string;

    type actual = UnionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a intersection type', () => {
    const outer = t.intersection([t.type({}), t.type({})]);

    type actual = UnionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match an interface type', () => {
    const outer = t.type({});

    type actual = UnionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
