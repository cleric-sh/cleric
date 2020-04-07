/* eslint-disable @typescript-eslint/no-explicit-any */
import * as t from 'io-ts';

import {ApiLookupOf} from './ApiLookupOf';
import {checks, check, Pass} from '@cleric/common';
import {ApiDefinition} from '../node/api/ApiDefinition';

describe('ApiLookupOf', () => {
  it('should do stuff', () => {
    type Def = [
      ApiDefinition<'Union', t.InterfaceType<t.Props>>,
      ApiDefinition<'Interface', t.InterfaceType<t.Props>>
    ];
    type actual = ApiLookupOf<Def>;
    type expected = 'Union' | 'Interface';

    checks([check<actual, expected, Pass>()]);
  });
});
