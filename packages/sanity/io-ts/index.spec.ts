/* eslint-disable sonarjs/no-duplicate-string */
import { Test } from '@cleric/common';
import * as t from 'io-ts';
import { Extends } from 'Any/Extends';

const { checks, check } = Test;

describe('t.InterfaceType', () => {
  it('is assignable to Any', () => {
    checks([check<Extends<t.InterfaceType<t.Any>, t.Any>, 1, Test.Pass>()]);
  });
});

describe('t.IntersectionType', () => {
  it('is assignable to Any', () => {
    checks([check<Extends<t.IntersectionType<t.Any[]>, t.Any>, 1, Test.Pass>()]);
  });
});

describe('t.UnionType', () => {
  it('is assignable to Any', () => {
    checks([check<Extends<t.UnionType<t.Any[]>, t.Any>, 1, Test.Pass>()]);
  });
});
