import {Template} from './Template';

export const isTemplate = (value: unknown): value is Template =>
  typeof value === 'object' && value !== null && value['__type'] === 'Template';
