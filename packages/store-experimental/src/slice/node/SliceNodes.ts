import { SliceTypes } from '..';
import * as t from 'io-ts';
import { ConfigKey } from '../../config';

export const SliceNodes: Partial<SliceTypes<ConfigKey, t.InterfaceType<t.Props>, never>> = {};
