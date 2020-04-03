import * as t from 'io-ts';

import {ParentType} from './ParentType';

export type ParentProps<T extends ParentType> = T extends t.InterfaceType<
  infer P
>
  ? P
  : never;
