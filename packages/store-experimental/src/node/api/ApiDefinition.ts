import * as t from 'io-ts';

import {ApiDecorator} from './ApiDecorator';
import {ApiGuard} from './ApiGuard';
import {ApiKey} from './index';

export interface HasApiKey<TKey extends ApiKey> {
  readonly key: TKey;
}

export interface ApiDefinition<TKey extends ApiKey, T extends t.Any>
  extends HasApiKey<TKey> {
  readonly guard: ApiGuard<T>;
  readonly decorator: ApiDecorator<T>;
}
