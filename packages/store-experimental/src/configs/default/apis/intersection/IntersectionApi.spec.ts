import * as t from 'io-ts';
import '../../index';

import {_Slice} from '../../../../slice/Slice';
import {Pass, checks, check, listen} from '@cleric/common';
import {ApiTypes} from '../../../../node/api';
import {expectConfigLoaded} from '../../expectConfigLoaded';
import {IntersectionApi} from '../../index';
import {ApiNode} from '../../../../node/ApiNode';
import {SliceNode} from '../../../../slice/node/SliceNode';
import {Subject} from 'rxjs';

type IntersectionApi<T extends t.Any> = ApiTypes<'Default', T>['Intersection'];

describe('IntersectionApi', () => {
  it('should create a slice for each property on an object type', async () => {
    const foo = t.type({foo: t.string});
    const bar = t.type({bar: t.number});
    const outer = t.intersection([foo, bar]);

    type actual = IntersectionApi<typeof outer>;

    type expected = {
      foo: _Slice<'Default', typeof foo, t.StringC>;
      bar: _Slice<'Default', typeof bar, t.NumberC>;
    };

    checks([check<actual, expected, Pass>()]);

    expectConfigLoaded();

    const src = new Subject();

    const node = {$configKey: 'Default', $: src, $type: outer} as ApiNode<
      'Default',
      typeof outer
    >;

    IntersectionApi.decorator(node, outer);

    const fooProp = node['foo'];
    expect(fooProp).toBeInstanceOf(SliceNode);
    expect(fooProp).toMatchObject({
      $configKey: 'Default',
      $type: t.string,
    });
    expect(fooProp.$).not.toBe(undefined);

    const barProp = node['bar'];
    expect(barProp).toBeInstanceOf(SliceNode);
    expect(barProp).toMatchObject({
      $configKey: 'Default',
      $type: t.number,
    });
    expect(barProp.$).not.toBe(undefined);

    const _foo = listen(fooProp.$);
    const _bar = listen(barProp.$);

    src.next({foo: 'TestFoo', bar: 1});
    src.next({foo: 'TestFoo2', bar: 2});

    src.complete();

    expect(await _foo).toEqual(['TestFoo', 'TestFoo2']);
    expect(await _bar).toEqual([1, 2]);
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
