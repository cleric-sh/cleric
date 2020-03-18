import * as t from 'io-ts';
import { ApiTypes } from '.';
import { Test } from '@cleric/common';
import { MatchApiType } from './MatchApiType';

const { checks, check } = Test;

const type = t.type({
  foo: t.string,
});

describe('MatchApiType', () => {
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
