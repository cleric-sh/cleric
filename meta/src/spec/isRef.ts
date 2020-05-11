import {Ref} from './Ref';
export const isRef = (value: unknown): value is Ref =>
  typeof value === 'object' && value !== null && value['__type'] === 'Ref';
