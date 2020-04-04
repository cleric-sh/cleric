import * as t from 'io-ts';

import {ApiDecorator} from './ApiDecorator';
import {ApiGuard} from './ApiGuard';
import {ApiKey} from './index';

export interface ApiDefinition<TKey extends ApiKey, T extends t.Any> {
  readonly decorator: ApiDecorator<T>;
  readonly guard: ApiGuard<T>;
  readonly key: TKey;
}
