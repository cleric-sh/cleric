import {ApiKey} from '../node/api';
import {ApiDefinition} from '../node/api/ApiDefinition';
import {SliceNodeKey} from '../slice/node/SliceNodeKey';

export interface Config {
  apis: ApiDefinition<ApiKey, any>[];
  slice: SliceNodeKey;
}
