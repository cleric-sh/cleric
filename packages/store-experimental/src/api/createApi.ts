import { ApiKey } from './index';
import * as t from 'io-ts';
import { ConfigKey } from '../config';
import { SliceNode } from '../SliceNode';

export type ApiGuard<T extends t.Any> = (type: t.Any) => type is T;

export type ApiDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: SliceNode<T>): void;
};

export interface ApiDefinition<TKey extends ApiKey, T extends t.Any> {
  readonly key: TKey;
  readonly guard: ApiGuard<T>;
  readonly decorate: ApiDecorator<T>;
}

export const createApi = <TKey extends ApiKey, T extends t.Any>(
  key: TKey,
  guard: ApiGuard<T>,
  decorate: ApiDecorator<T>,
): ApiDefinition<TKey, T> => ({ key, guard, decorate });
