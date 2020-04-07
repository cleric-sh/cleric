import * as t from 'io-ts';

import {ApiLookupOf} from './ApiLookupOf';
import {checks, check, Pass} from '@cleric/common';
import {ApiDefinition} from '../node/api/ApiDefinition';

describe('ApiLookupOf', () => {
  it('should do stuff', () => {
    const myType = t.type({foo: t.string});

    type Def = [ApiDefinition<'Union', t.InterfaceType<t.Props>>];
    type actual = ApiLookupOf<Def>;
    type expected = {};

    checks([check<actual, expected, Pass>()]);
  });
});
