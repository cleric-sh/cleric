import * as t from 'io-ts';

import {Constructor} from '@cleric/common/src/types';
import {ConfigKey} from '../../config';
import {SliceNode} from './SliceNode';

export type SliceConstructor = Constructor<SliceNode<ConfigKey, t.Any, t.Any>>;
