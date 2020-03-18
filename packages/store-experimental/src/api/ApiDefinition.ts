import { ApiKey } from './index';
import { ApiGuard } from './ApiGuard';
import { ApiDecorator } from './ApiDecorator';
import * as t from 'io-ts';

export interface ApiDefinition<TKey extends ApiKey, T extends t.Any> {
  readonly key: TKey;
  readonly guard: ApiGuard<T>;
  readonly decorate: ApiDecorator<T>;
}
