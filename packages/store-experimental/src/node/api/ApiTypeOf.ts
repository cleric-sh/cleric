import * as t from 'io-ts';
import {List, Union} from 'ts-toolbelt';

import {ConfigKey} from '../../config';

import {MatchApiTypes} from './MatchApiTypes';

export type ApiTypeOf<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = Union.Merge<List.UnionOf<MatchApiTypes<TConfigKey, T>>>;
