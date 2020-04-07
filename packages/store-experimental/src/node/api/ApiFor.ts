import * as t from 'io-ts';
import {Union} from 'ts-toolbelt';

import {ConfigKey} from '../../config';

import {GetConfig} from '../../config/GetApis';
import {ApiTypes} from './ApiTypes';
import {Cast} from 'Any/Cast';
import {ApiKey} from '.';

type _ApiFor<TConfigKey extends ConfigKey, TNode extends t.Any> = Union.Merge<
  GetConfig<TConfigKey>['_apiKeys'] extends infer K
    ? ApiTypes<TConfigKey, TNode>[Cast<K, ApiKey>]
    : never
>;

export type ApiFor<TConfigKey extends ConfigKey, TNode extends t.Any> = _ApiFor<
  TConfigKey,
  TNode
> extends infer X
  ? Cast<X, object>
  : never;
