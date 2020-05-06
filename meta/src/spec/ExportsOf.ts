import {ExportOnly} from './ExportOnly';

export type ExportsOf<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown>
    ? ExportsOf<T[K]>
    : ExportOnly<T[K]>;
};
