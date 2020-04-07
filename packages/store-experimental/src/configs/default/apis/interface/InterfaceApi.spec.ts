import * as t from 'io-ts';

import {InterfaceApi} from './InterfaceApi';
import {_Slice} from '../../../../slice/Slice';
import {Pass, checks, check} from '@cleric/common';

describe('InterfaceApi', () => {
  it('should create a slice for each property on an object type', () => {
    const outer = t.type({foo: t.string, bar: t.number});

    type actual = InterfaceApi<'Default', typeof outer>;
    type expected = {
      foo: _Slice<'Default', typeof outer, t.StringC>;
      bar: _Slice<'Default', typeof outer, t.NumberC>;
    };

    checks([check<actual, expected, Pass>()]);
  });

  it('should create no properties on empty object type', () => {
    const outer = t.type({});

    type actual = InterfaceApi<'Default', typeof outer>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a scalar type', () => {
    const outer = t.string;

    type actual = InterfaceApi<'Default', typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match a union type', () => {
    const outer = t.union([t.type({}), t.type({})]);

    type actual = InterfaceApi<'Default', typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });

  it('should not match an intersection type', () => {
    const outer = t.intersection([t.type({}), t.type({})]);

    type actual = InterfaceApi<'Default', typeof outer>;
    type expected = never;

    checks([check<actual, expected, Pass>()]);
  });
});
