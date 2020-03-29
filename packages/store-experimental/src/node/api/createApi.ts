import * as t from 'io-ts';

import {ApiDecorator} from './ApiDecorator';
import {ApiDefinition} from './ApiDefinition';
import {ApiGuard} from './ApiGuard';
import {ApiKey} from './index';

export const createApi = <TKey extends ApiKey, T extends t.Any>(
  key: TKey,
  guard: ApiGuard<T>,
  decorate: ApiDecorator<T>
): ApiDefinition<TKey, T> => ({key, guard, decorate});
