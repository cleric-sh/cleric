import { ApiFor } from './ApiFor';
import { checks, check, Pass } from '@cleric/common';
import * as t from 'io-ts';
import '../../test';
import { FooType } from '../../test/apis/FooApi';

describe('ApiFor', () => {
  it('should do stuff', () => {
    type actual = ApiFor<'Test', typeof FooType>;
    type expected = { $foo: void };

    checks([check<actual, expected, Pass>()]);
  });
});
