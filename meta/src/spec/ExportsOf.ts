import {PromiseOf} from 'Class/PromiseOf';
import {ExportOnly} from './ExportOnly';

export type ExportsOf<T> = {
  [K in keyof T]: PromiseOf<T[K]> extends Record<string, unknown> | [unknown]
    ? ExportsOf<PromiseOf<T[K]>>
    : ExportOnly<PromiseOf<T[K]>>;
};
