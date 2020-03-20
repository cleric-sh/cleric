import { ConfigKey } from '../../config';
import { ApiTypes } from './ApiTypes';
import { ApiKey } from './ApiKey';
import * as t from 'io-ts';

export type MatchApiType<
  TConfigKey extends ConfigKey,
  K extends ApiKey,
  G extends t.Any,
  T extends t.Any
> = t.TypeOf<T> extends t.TypeOf<G> ? ApiTypes<TConfigKey, T>[K] : never;
