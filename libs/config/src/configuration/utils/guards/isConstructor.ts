import {Class} from 'Class/Class';

export const isConstructor = (target: unknown): target is Class =>
  typeof target === 'function' && (target as Class).prototype !== undefined;
