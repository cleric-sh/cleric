import { ConfigKey, ConfigTypes } from '../config';
import { SliceTypes } from './SliceTypes';
import * as t from 'io-ts';

export type SliceTypeOf<TConfigKey extends ConfigKey, T extends t.Any> = InstanceType<SliceTypes<T>[ConfigTypes[TConfigKey]['slice']]>;
