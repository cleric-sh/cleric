import * as t from 'io-ts';

import {SliceParentType} from './SliceParentType';

export type SliceParentProps<
  T extends SliceParentType
> = T extends t.InterfaceType<infer P> ? P : never;
