import 'reflect-metadata';

export const DEPRECATED_METADATA_KEY = Symbol('Deprecated');

export function Deprecated(msg: string) {
  return Reflect.metadata(DEPRECATED_METADATA_KEY, msg);
}
