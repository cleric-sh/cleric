import { ApiKey } from './index';
import * as t from 'io-ts';
import { ConfigKey } from '../config';
import { SliceNode } from '../SliceNode';

type SliceGuard<T extends t.Any> = (type: t.Any) => type is T;

type SliceDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: SliceNode<T>): SliceNode<T>;
};

export interface SliceApi<TKey extends ApiKey, T extends t.Any> {
  readonly key: TKey;
  readonly guard: SliceGuard<T>;
  readonly decorate: SliceDecorator<T>;
}

export const SliceApi = <TKey extends ApiKey, T extends t.Any>(
  key: TKey,
  guard: SliceGuard<T>,
  decorator: SliceDecorator<T>,
): SliceApi<TKey, T> => ({ key, guard, decorate: decorator });
