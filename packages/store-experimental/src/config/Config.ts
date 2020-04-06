import * as t from 'io-ts';

import {ApiLookupOf} from './ApiLookupOf';
import {ConfigArgs} from './ConfigArgs';

export type Config<TConfig extends ConfigArgs> = TConfig & {
  _apiLookup: ApiLookupOf<TConfig['apis']>;
};
