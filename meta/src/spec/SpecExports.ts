import {PromiseOf} from 'Class/_api';
import {Refs} from './Refs';
import {Spec} from './Spec';
import {Template} from './template/Template';

export type SpecExports<T> = {
  [K in keyof T]: PromiseOf<T[K]> extends Template<infer Exports>
    ? Refs<Exports>
    : PromiseOf<T[K]> extends Array<infer Templates>
    ? SpecExports<Templates>
    : never;
};

export type _SpecExports<TSpec extends Spec> = SpecExports<
  PromiseOf<ReturnType<TSpec>>
> extends infer X
  ? X
  : never;
