import {WriteContext} from '../../generate/WriteContext';

export type GenerateFn = (ctx: WriteContext) => Promise<string>;

export interface Template<TExports = {}> {
  __errors?: TExports;
  __type: 'Template';
  generate: GenerateFn;
}
