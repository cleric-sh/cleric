/* eslint-disable @typescript-eslint/no-explicit-any */
import * as t from 'io-ts';

import {ApiKeysOf} from './ApiKeysOf';
import {checks, check, Pass} from '@cleric/common';
import {ApiDefinition} from '../node/api/ApiDefinition';

describe('ApiKeysOf', () => {
  it('should do stuff', () => {
    type Def = [
      ApiDefinition<'Union', t.Any>,
      ApiDefinition<'Interface', t.Any>
    ];
    type actual = ApiKeysOf<Def>;
    type expected = 'Union' | 'Interface';

    checks([check<actual, expected, Pass>()]);
  });
});
