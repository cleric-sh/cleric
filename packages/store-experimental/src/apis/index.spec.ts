import * as t from 'io-ts';
import { MatchApiType, ApiTypes } from '.';
import { Test } from '@cleric/common';

describe.only('MatchApiType', () => {
  it('should return API for type when type guard matches', () => {
    const { checks, check } = Test;

    const type = t.type({
      foo: t.string,
    });

    type actual = MatchApiType<'Default', 'Interface', t.InterfaceType<t.Props>, typeof type>;
    type expected = ApiTypes<'Default', typeof type>['Interface'];

    checks([check<actual, expected, Test.Pass>()]);
  });

  it('should return never when type guard doesnt match', () => {
    const { checks, check } = Test;

    const type = t.type({
      foo: t.string,
    });

    type actual = MatchApiType<'Default', 'Interface', t.IntersectionType<t.Any[]>, typeof type>;

    checks([check<actual, never, Test.Pass>()]);
  });
});
