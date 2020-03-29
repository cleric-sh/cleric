import * as t from 'io-ts';

import {SliceTypes} from '..';
import {ConfigKey} from '../../config';

export const SliceNodes: Partial<SliceTypes<
  ConfigKey,
  t.InterfaceType<t.Props>,
  never
>> = {};
