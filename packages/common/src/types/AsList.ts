import {List} from 'ts-toolbelt';

import {IsOr} from '../types';

export type AsList<T> = IsOr<T, List.List, [T]>;
