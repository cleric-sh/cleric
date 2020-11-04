/* eslint-disable @typescript-eslint/no-explicit-any */
import * as t from 'io-ts';

import {Pass, check, checks} from '@cleric/common';
import {ApiDefinition} from '../node/api/ApiDefinition';
import {ApiKeysOf} from './ApiKeysOf';

describe('ApiKeysOf', () => {
  it('should do stuff', () => {
    type Def = [
      ApiDefinition<'Union', t.Any>,
      ApiDefinition<'Interface', t.Any>
    ];
    type actual = ApiKeysOf<Def>;
    type expected = 'Interface' | 'Union';

    checks([check<actual, expected, Pass>()]);
  });
});
