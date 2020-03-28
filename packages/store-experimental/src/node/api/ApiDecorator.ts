import * as t from 'io-ts';

import {ConfigKey} from '../../config';
import {ApiNode} from "../ApiNode";

export type ApiDecorator<T extends t.Any> = {
  (configKey: ConfigKey, type: T, slice: ApiNode<ConfigKey, T>): void;
};
