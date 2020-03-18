import { ApiKey } from './index';
import * as t from 'io-ts';
import { ConfigKey } from '../config';
import { SliceNode } from '../SliceNode';

export type SliceGuard<T extends t.Any> = (type: t.Any) => type is T;

export type SliceDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: SliceNode<T>): void;
};

export interface SliceApi<TKey extends ApiKey, T extends t.Any> {
  readonly key: TKey;
  readonly guard: SliceGuard<T>;
  readonly decorate: SliceDecorator<T>;
}

export const SliceApi = <TKey extends ApiKey, T extends t.Any>(
  key: TKey,
  guard: SliceGuard<T>,
  decorate: SliceDecorator<T>,
): SliceApi<TKey, T> => ({ key, guard, decorate });
