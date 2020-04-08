import * as t from 'io-ts';

import '../../index';

import {Pass, checks, check, listen} from '@cleric/common';

import {InterfaceApi} from './InterfaceApi';
import {_Slice} from '../../../../slice/Slice';
import {ApiTypes} from '../../../../node/api/ApiTypes';
import {ApiNode} from '../../../../node/ApiNode';
import {SliceNode} from '../../../../slice/node/SliceNode';
import {Subject} from 'rxjs';
import {expectConfigLoaded} from '../../expectConfigLoaded';

type InterfaceApi<T extends t.Any> = ApiTypes<'Default', T>['Interface'];

describe('InterfaceApi', () => {
  it('should create a slice for each property on an object type', async () => {
    const outer = t.type({foo: t.string, bar: t.number});

    type actual = InterfaceApi<typeof outer>;

    type expected = {
      foo: _Slice<'Default', typeof outer, t.StringC>;
      bar: _Slice<'Default', typeof outer, t.NumberC>;
    };

    checks([check<actual, expected, Pass>()]);

    expectConfigLoaded();

    const src = new Subject();

    const node = {$configKey: 'Default', $: src, $type: outer} as ApiNode<
      'Default',
      typeof outer
    >;

    InterfaceApi.decorator(node, outer);

    const foo = node['foo'];
    expect(foo).toBeInstanceOf(SliceNode);
    expect(foo).toMatchObject({
      $configKey: 'Default',
      $type: t.string,
    });
    expect(foo.$).not.toBe(undefined);

    const bar = node['bar'];
    expect(bar).toBeInstanceOf(SliceNode);
    expect(bar).toMatchObject({
      $configKey: 'Default',
      $type: t.number,
    });
    expect(bar.$).not.toBe(undefined);

    const _foo = listen(foo.$);
    const _bar = listen(bar.$);

    src.next({foo: 'TestFoo', bar: 1});
    src.next({foo: 'TestFoo2', bar: 2});

    src.complete();

    expect(await _foo).toEqual(['TestFoo', 'TestFoo2']);
    expect(await _bar).toEqual([1, 2]);
  });

  it('should create no properties on empty object type', () => {
    const outer = t.type({});

    type actual = InterfaceApi<typeof outer>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a scalar type', () => {
    const outer = t.string;

    type actual = InterfaceApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a union type', () => {
    const outer = t.union([t.type({}), t.type({})]);

    type actual = InterfaceApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match an intersection type', () => {
    const outer = t.intersection([t.type({}), t.type({})]);

    type actual = InterfaceApi<typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
