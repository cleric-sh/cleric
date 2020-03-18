import * as t from 'io-ts';
import { ApiTypes } from '.';
import { Test } from '@cleric/common';
import { MatchApiTypes } from './MatchApiTypes';

const { checks, check } = Test;

const type = t.type({
  foo: t.string,
});

describe('MatchApiTypes', () => {
  it('should return API for type when type guard matches, otherwise never', () => {
    type actual = MatchApiTypes<'Default', typeof type>;
    type expected = [ApiTypes<'Default', typeof type>['Interface'], never, never];

    checks([check<actual, expected, Test.Pass>()]);
  });
});
