import { ApiKey } from './index';
import * as t from 'io-ts';
import { ConfigKey } from '../config';
import { SliceNode } from '../SliceNode';
import { Types } from '@cleric/common';

export type SliceGuard<T extends t.Any> = (type: t.Any) => type is T;

export type SliceDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: SliceNode<T>): SliceNode<T>;
};

export interface SliceMixin<T extends t.Any> {
  <TSliceCtor extends Types.Constructor<SliceNode<T>>>(
    configKey: ConfigKey,
    type: T,
    SliceNode: TSliceCtor,
  ): TSliceCtor;
}

export interface SliceApi<TKey extends ApiKey, T extends t.Any> {
  readonly key: TKey;
  readonly guard: SliceGuard<T>;
  // readonly decorate: SliceDecorator<T>;
  readonly mixin: SliceMixin<T>;
}

export const SliceApi = <TKey extends ApiKey, T extends t.Any>(
  key: TKey,
  guard: SliceGuard<T>,
  // decorate: SliceDecorator<T>,
  mixin: SliceMixin<T>,
  // ): SliceApi<TKey, T> => ({ key, guard, decorate, mixin });
): SliceApi<TKey, T> => ({ key, guard, mixin });
