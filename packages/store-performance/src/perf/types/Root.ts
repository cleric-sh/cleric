import * as t from 'io-ts';

import {type1} from './Type1';
import {type2} from './Type2';
import {type3} from './Type3';
import {type4} from './Type4';
import {type5} from './Type5';

export const root = t.type({
  type1,
  type2,
  type3,
  type4,
  type5,
});

export type Root = typeof root;
