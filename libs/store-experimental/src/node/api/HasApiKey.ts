import {ApiKey} from './index';

export interface HasApiKey<TKey extends ApiKey> {
  readonly key: TKey;
}
