import * as t from 'io-ts';
import {List, Union} from 'ts-toolbelt';

import {ConfigKey} from '../../config';

import {MatchApiTypes} from './MatchApiTypes';

type _ApiTypeOf<TConfigKey extends ConfigKey, T extends t.Any> = Union.Merge<
  List.UnionOf<MatchApiTypes<TConfigKey, T>>
>;

export type ApiTypeOf<
  TConfigKey extends ConfigKey,
  T extends t.Any
> = _ApiTypeOf<TConfigKey, T> extends infer X ? X : never;
