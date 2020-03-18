import { ApiFor } from './ApiFor';
import { checks, check, Pass } from '@cleric/common';
import * as t from 'io-ts';
import '../../test';

const type = t.type({
  foo: t.string,
});

describe('ApiFor', () => {
  it('should do stuff', () => {
    type actual = ApiFor<'Test', typeof type>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });
});
