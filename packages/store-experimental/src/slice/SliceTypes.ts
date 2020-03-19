import { SliceNode } from './SliceNode';
import * as t from 'io-ts';
import { Constructor } from '@cleric/common/src/types';

export interface SliceTypes<T extends t.Any> {
    'SliceNode': Constructor<SliceNode<T>>;
}
