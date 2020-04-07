import {ApiKey} from '../node/api';
import {HasApiKey} from '../node/api/HasApiKey';

export type ApiKeysOf<
  TApis extends Array<HasApiKey<ApiKey>>
> = TApis extends Array<infer T>
  ? T extends HasApiKey<infer K>
    ? K
    : never
  : never;
