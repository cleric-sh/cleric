import * as t from 'io-ts';

import {ApiDecorator} from './ApiDecorator';
import {ApiGuard} from './ApiGuard';
import {ApiKey} from './index';

export interface ApiDefinition<TKey extends ApiKey, T extends t.Any> {
  readonly key: TKey;
  readonly guard: ApiGuard<T>;
  readonly decorate: ApiDecorator<T>;
}
