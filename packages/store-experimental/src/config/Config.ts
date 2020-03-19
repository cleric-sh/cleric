import { ApiKey } from '../slice/api';
import { ApiDefinition } from '../slice/api/ApiDefinition';
import { SliceNodeKey } from "../slice/node/SliceNodeKey";

export interface Config {
  apis: ApiDefinition<ApiKey, any>[];
  slice: SliceNodeKey;
}
