import { ApiKey } from '../slice/api';
import { ApiDefinition } from '../slice/api/ApiDefinition';

export interface Config {
  apis: ApiDefinition<ApiKey, any>[];
}
