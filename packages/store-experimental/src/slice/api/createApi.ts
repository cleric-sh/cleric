import { ApiKey } from './index';
import * as t from 'io-ts';
import { ApiGuard } from './ApiGuard';
import { ApiDecorator } from './ApiDecorator';
import { ApiDefinition } from './ApiDefinition';

export const createApi = <TKey extends ApiKey, T extends t.Any>(
  key: TKey,
  guard: ApiGuard<T>,
  decorate: ApiDecorator<T>,
): ApiDefinition<TKey, T> => ({ key, guard, decorate });
