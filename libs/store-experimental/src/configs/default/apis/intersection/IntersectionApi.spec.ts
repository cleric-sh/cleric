import * as t from 'io-ts';
import '../../index';

import {Pass, check, checks, listen} from '@cleric/common';
import {Subject} from 'rxjs';
import {ApiNode} from '../../../../node/ApiNode';
import {ApiTypes} from '../../../../node/api';
import {_Slice} from '../../../../slice/Slice';
import {SliceNode} from '../../../../slice/node/SliceNode';
import {expectConfigLoaded} from '../../expectConfigLoaded';
import {IntersectionApi} from '../../index';

type IntersectionApi<T extends t.Any> = ApiTypes<'Default', T>['Intersection'];

describe('IntersectionApi', () => {
  it('should create a slice for each property on an object type', async () => {
    const foo = t.type({foo: t.string});
    const bar = t.type({bar: t.number});
    const outer = t.intersection([foo, bar]);

    type actual = IntersectionApi<typeof outer>;

    type expected = {
      bar: _Slice<'Default', typeof bar, t.NumberC>;
      foo: _Slice<'Default', typeof foo, t.StringC>;
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

    src.next({bar: 1, foo: 'TestFoo'});
    src.next({bar: 2, foo: 'TestFoo2'});

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

  it('should not match a recursion type', () => {
    type _Recursion = {
      foo: _Recursion;
    };

    type Recursion = t.RecursiveType<
      t.TypeC<{
        foo: Recursion;
      }>,
      _Recursion
    >;

    const recursion: Recursion = t.recursion('RecursiveType', () =>
      t.type({
        foo: recursion,
      })
    );

    type actual = IntersectionApi<typeof recursion>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
