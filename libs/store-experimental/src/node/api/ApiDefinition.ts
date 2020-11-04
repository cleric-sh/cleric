import * as t from 'io-ts';

import {ApiDecorator} from './ApiDecorator';
import {ApiGuard} from './ApiGuard';
import {HasApiKey} from './HasApiKey';
import {ApiKey} from './index';

export interface ApiDefinition<TKey extends ApiKey, T extends t.Any>
  extends HasApiKey<TKey> {
  readonly decorator: ApiDecorator<T>;
  readonly guard: ApiGuard<T>;
}
