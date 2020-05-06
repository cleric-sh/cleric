import {Clean} from 'Any/Clean';
import {Compute} from 'Any/Compute';
import {PromiseOf} from 'Class/_api';
import {ExportsOf} from './ExportsOf';
import {Import} from './Import';
import {Spec} from './Spec';

export type ImportsOf<T, U = ExportsOf<T>> = Clean<
  Compute<
    {
      [K in keyof U]: U[K] extends Record<string, unknown>
        ? ImportsOf<U[K]>
        : Import;
    }
  >
>;

export type _ImportsOf<TSpec extends Spec<unknown>> = ImportsOf<
  PromiseOf<ReturnType<TSpec['files']>>
> extends infer X
  ? X
  : never;
