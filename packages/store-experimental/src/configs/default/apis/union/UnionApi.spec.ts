import * as t from 'io-ts';
import '../../index';

import {_Slice} from '../../../../slice/Slice';
import {Pass, checks, check, listen} from '@cleric/common';
import {ApiTypes} from '../../../../node/api';
import {UnionApi} from './UnionApi';
import {expectConfigLoaded} from '../../expectConfigLoaded';
import {Subject} from 'rxjs';
import {ApiNode} from '../../../../node/ApiNode';
import {SliceNode} from '../../../../slice/node/SliceNode';

type UnionApi<T extends t.Any> = ApiTypes<'Default', T>['Union'];

describe('UnionApi', () => {
  it('should create a slice for each property on an object type', async () => {
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

    expectConfigLoaded();

    const src = new Subject();

    const node = {$configKey: 'Default', $: src, $type: fooBar} as ApiNode<
      'Default',
      typeof fooBar
    >;

    UnionApi.decorator(node, fooBar);

    const fooProp = node['$is'](foo);
    expect(fooProp).toBeInstanceOf(SliceNode);
    expect(fooProp).toMatchObject({
      $configKey: 'Default',
      $type: foo,
    });
    expect(fooProp.$).not.toBe(undefined);

    const barProp = node['$is'](bar);
    expect(barProp).toBeInstanceOf(SliceNode);
    expect(barProp).toMatchObject({
      $configKey: 'Default',
      $type: bar,
    });
    expect(barProp.$).not.toBe(undefined);

    const _foo = listen(fooProp.$);
    const _bar = listen(barProp.$);

    src.next({foo: 'TestFoo'});
    src.next({bar: 1});

    src.complete();

    expect(await _foo).toEqual([{foo: 'TestFoo'}]);
    expect(await _bar).toEqual([{bar: 1}]);
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
