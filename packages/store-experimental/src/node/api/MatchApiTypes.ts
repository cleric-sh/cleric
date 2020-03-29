import {TError} from '@cleric/common';
import * as t from 'io-ts';

import {ConfigKey, GetApis} from '../../config';

import {ApiDefinition} from './ApiDefinition';
import {MatchApiType} from './MatchApiType';

export type MatchApiTypes<
  TConfigKey extends ConfigKey,
  T extends t.Any,
  TApis = GetApis<TConfigKey>
> = TApis extends TError<infer M>
  ? TError<M>
  : {
      [K in keyof TApis]: TApis[K] extends ApiDefinition<infer ApiKey, infer G>
        ? MatchApiType<TConfigKey, ApiKey, G, T>
        : never;
    };
