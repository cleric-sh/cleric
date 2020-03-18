import { ApiKey } from '../api';
import { ApiDefinition } from '../api/ApiDefinition';

export interface Config {
  apis: ApiDefinition<ApiKey, any>[];
}
