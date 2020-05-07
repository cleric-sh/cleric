import {Clean} from 'Any/Clean';
import {PromiseOf} from 'Class/_api';
import {ExportsOf} from './ExportsOf';
import {Import} from './Import';
import {Spec} from './Spec';

export type ImportsOf<T, U = ExportsOf<T>> = Clean<
  {
    [K in keyof U]: U[K] extends Record<string, unknown> | Array<unknown>
      ? ImportsOf<U[K]>
      : Import;
  }
>;

export type _ImportsOf<TSpec extends Spec> = ImportsOf<
  PromiseOf<ReturnType<TSpec>>
> extends infer X
  ? X
  : never;
