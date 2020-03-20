import { SliceParentType } from './SliceParentType';
import * as t from 'io-ts';

export type SliceParentProps<T extends SliceParentType> = T extends t.InterfaceType<infer P> ? P : never;
