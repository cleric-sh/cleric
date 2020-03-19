import { ConfigKey, ConfigTypes } from '../../config';
import { SliceNodeTypes } from './SliceNodeTypes';
import * as t from 'io-ts';

export type SliceNodeTypeOf<TConfigKey extends ConfigKey, T extends t.Any> = SliceNodeTypes<T>[ConfigTypes[TConfigKey]['slice']];
