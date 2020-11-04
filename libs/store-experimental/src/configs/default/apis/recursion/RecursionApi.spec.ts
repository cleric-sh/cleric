import * as t from 'io-ts';

import '../../index';

import {Pass, check, checks, listen} from '@cleric/common';

import {Subject} from 'rxjs';
import {ApiNode} from '../../../../node/ApiNode';
import {ApiTypes} from '../../../../node/api/ApiTypes';
import {_Slice} from '../../../../slice/Slice';
import {SliceNode} from '../../../../slice/node/SliceNode';
import {expectConfigLoaded} from '../../expectConfigLoaded';
import {RecursionApi} from './RecursionApi';

type RecursionApi<T extends t.Any> = ApiTypes<'Default', T>['RecursionApi'];

describe('InterfaceApi', () => {
  it('should create a slice for each property on an object type', async () => {
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

    type actual = RecursionApi<typeof recursion>;

    type expected = {
      foo: _Slice<'Default', typeof recursion, typeof recursion>;
    };

    checks([check<actual, expected, Pass>()]);

    expectConfigLoaded();

    const src = new Subject();

    const node = {$configKey: 'Default', $: src, $type: recursion} as ApiNode<
      'Default',
      typeof recursion
    >;

    RecursionApi.decorator(node, recursion);

    const foo = node['foo'];
    expect(foo).toBeInstanceOf(SliceNode);
    expect(foo).toMatchObject({
      $configKey: 'Default',
      $type: recursion,
    });
    expect(foo.$).not.toBe(undefined);

    const _foo = listen(foo.$);

    src.next({foo: {}});
    src.next({foo: {foo: {}}});

    src.complete();

    expect(await _foo).toEqual([{}, {foo: {}}]);
  });

  it('should create no properties on empty object type', () => {
    type _Recursion = {
      root: _Recursion;
    };

    type Recursion = t.RecursiveType<
      t.TypeC<{
        root: Recursion;
      }>,
      _Recursion
    >;

    const recursion: Recursion = t.recursion('Root', () =>
      t.type({
        root: recursion,
      })
    );

    type actual = RecursionApi<typeof recursion>;
    type expected = {root: SliceNode<'Default', Recursion, Recursion>};

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a scalar type', () => {
    const outer = t.string;

    type actual = RecursionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a union type', () => {
    const outer = t.union([t.type({}), t.type({})]);

    type actual = RecursionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match an intersection type', () => {
    const outer = t.intersection([t.type({}), t.type({})]);

    type actual = RecursionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match an interface type', () => {
    const outer = t.type({});

    type actual = RecursionApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
