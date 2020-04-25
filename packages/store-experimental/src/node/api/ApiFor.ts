import * as t from 'io-ts';

import {Cast} from 'Any/Cast';

import {Union} from 'ts-toolbelt';
import {ApiKey} from '.';
import {ConfigKey} from '../../config';
import {GetConfig} from '../../config/getConfig';
import {ApiTypes} from './ApiTypes';

type EmptyIfUnknown<T> = unknown extends T ? {} : T;

type ApiFor<TConfigKey extends ConfigKey, TNode extends t.Any> = EmptyIfUnknown<
  Union.IntersectOf<
    GetConfig<TConfigKey>['_apiKeys'] extends infer K
      ? ApiTypes<TConfigKey, TNode>[Cast<K, ApiKey>]
      : never
  >
>;

export type _ApiFor<TConfigKey extends ConfigKey, TNode extends t.Any> = ApiFor<
  TConfigKey,
  TNode
> extends infer X
  ? X
  : never;
