import {Pass, check, checks} from '@cleric/common';
import {Extends} from 'Any/Extends';
import * as t from 'io-ts';

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
