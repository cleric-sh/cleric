import { SliceNode, SliceParentProps } from './SliceNode';
import * as t from 'io-ts';
import { ConfigKey } from '../../config';

export interface SliceNodeTypes<TConfigKey extends ConfigKey, P extends t.InterfaceType<t.Props>, K extends keyof SliceParentProps<P>> {
    'SliceNode': SliceNode<TConfigKey, P, K>;
}
