import * as t from 'io-ts';

import {ApiKey} from '../node/api';
import {ApiLookup} from '../node/api/ApiDefinition';

export type ApiLookupOf<
  TApis extends Array<ApiLookup<t.Any, ApiKey>>
> = TApis extends Array<infer T>
  ? T extends ApiLookup<infer G, infer K>
    ? [t.TypeOf<G>, K]
    : never
  : never;
