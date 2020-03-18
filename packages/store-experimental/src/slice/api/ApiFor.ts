import { Union, List } from 'ts-toolbelt';
import { ConfigKey } from '../../config';
import { MatchApiTypes } from './MatchApiTypes';
import * as t from 'io-ts';

export type ApiFor<TConfigKey extends ConfigKey, T extends t.Any> = Union.Merge<
  List.UnionOf<MatchApiTypes<TConfigKey, T>>
>;
