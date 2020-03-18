import { ConfigKey } from '../../config';
import { SliceNode } from '../SliceNode';
import * as t from 'io-ts';

export type ApiDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: SliceNode<T>): void;
};
