import * as t from 'io-ts';
import { MatchApiType, ApiTypes, MatchApiTypes } from '.';
import { Test } from '@cleric/common';

const { checks, check } = Test;

const type = t.type({
  foo: t.string,
});

describe.only('MatchApiType', () => {
  it('should return API for type when type guard matches', () => {
    type actual = MatchApiType<'Default', 'Interface', t.InterfaceType<t.Props>, typeof type>;
    type expected = ApiTypes<'Default', typeof type>['Interface'];

    checks([check<actual, expected, Test.Pass>()]);
  });

  it('should return never when type guard doesnt match', () => {
    type actual = MatchApiType<'Default', 'Interface', t.IntersectionType<t.Any[]>, typeof type>;
    type expected = never;

    checks([check<actual, expected, Test.Pass>()]);
  });
});

describe('MatchApiTypes', () => {
  it('should return API for type when type guard matches, otherwise never', () => {
    type actual = MatchApiTypes<'Default', typeof type>;
    type expected = [ApiTypes<'Default', typeof type>['Interface'], never, never];

    checks([check<actual, expected, Test.Pass>()]);
  });
});
