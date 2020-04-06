import * as t from 'io-ts';

import {ApiDecorator} from './ApiDecorator';
import {ApiGuard} from './ApiGuard';
import {ApiKey} from './index';

export interface ApiLookup<T extends t.Any, TKey extends ApiKey> {
  readonly guard: ApiGuard<T>;
  readonly key: TKey;
}

export interface ApiDefinition<TKey extends ApiKey, T extends t.Any>
  extends ApiLookup<T, TKey> {
  readonly decorator: ApiDecorator<T>;
}
