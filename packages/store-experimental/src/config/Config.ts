import { ApiKey } from '../slice/api';
import { ApiDefinition } from '../slice/api/ApiDefinition';
import { SliceKey } from "../slice/SliceKey";

export interface Config {
  apis: ApiDefinition<ApiKey, any>[];
  slice: SliceKey;
}
