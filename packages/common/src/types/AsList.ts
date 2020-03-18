import { IsOr } from '../types';
import { List } from 'ts-toolbelt';

export type AsList<T> = IsOr<T, List.List, [T]>;
