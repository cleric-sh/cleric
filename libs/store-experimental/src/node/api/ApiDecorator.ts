import * as t from 'io-ts';

import {ConfigKey} from '../../config';
import {ApiNode} from '../ApiNode';

export type ApiDecorator<TNode extends t.Any, T extends t.Any = TNode> = {
  (node: ApiNode<ConfigKey, TNode>, type: T): void;
};
