import {ApiKey} from '../node/api';
import {ApiDefinition} from '../node/api/ApiDefinition';
import {SliceNodeKey} from '../slice/node/SliceNodeKey';

export interface ConfigArgs {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  apis: ApiDefinition<ApiKey, any>[];
  slice: SliceNodeKey;
}
