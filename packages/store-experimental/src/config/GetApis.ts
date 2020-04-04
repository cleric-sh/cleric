import {TError} from '@cleric/common';
import {List, Union} from 'ts-toolbelt';

import {Config} from './Config';
import {ConfigKey} from './ConfigKey';
import {ConfigTypes} from './ConfigTypes';

export type GetConfig<
  TConfigKey extends ConfigKey,
  TConfig = ConfigTypes[TConfigKey]
> = TConfig extends Config
  ? TConfig['apis'] extends List.List<unknown>
    ? TConfig // This step ensures that typed arrays are converted into tuples.
    : TError<
        "Configuration's 'apis' property must be an Array or Tuple of SliceApis."
      >
  : TError<"Configuration is not assignable to interface 'Config'.">;

export type GetApis<
  TConfigKey extends ConfigKey,
  TConfig = NonNullable<ConfigTypes[TConfigKey]>
> = TConfig extends Config
  ? TConfig['apis'] extends List.List<infer L>
    ? Union.ListOf<L> // This step ensures that typed arrays are converted into tuples.
    : TError<
        "Configuration's 'apis' property must be an Array or Tuple of SliceApis."
      >
  : TError<"Configuration is not assignable to interface 'Config'.">;
