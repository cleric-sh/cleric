/* eslint-disable sonarjs/no-duplicate-string */
import { checks, check, Pass } from '@cleric/common';
import * as t from 'io-ts';
import { Extends } from 'Any/Extends';

describe('t.InterfaceType', () => {
  it('is assignable to Any', () => {
    checks([check<Extends<t.InterfaceType<t.Any>, t.Any>, 1, Pass>()]);
  });
});

describe('t.IntersectionType', () => {
  it('is assignable to Any', () => {
    checks([check<Extends<t.IntersectionType<t.Any[]>, t.Any>, 1, Pass>()]);
  });
});

describe('t.UnionType', () => {
  it('is assignable to Any', () => {
    checks([check<Extends<t.UnionType<t.Any[]>, t.Any>, 1, Pass>()]);
  });
});
