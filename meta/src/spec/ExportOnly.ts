import {Template} from 'Template';
import {Export} from './Export';

export type ExportOnly<T> = T extends Export<string> ? T : never;
