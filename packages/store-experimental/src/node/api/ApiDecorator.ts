import { ConfigKey } from '../../config';
import * as t from 'io-ts';
import { ApiNode } from "../ApiNode";

export type ApiDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: ApiNode<ConfigKey, T>): void;
};