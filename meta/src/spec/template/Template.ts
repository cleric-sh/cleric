import {Context} from './Context';

export type GenerateFn = (ctx: Context) => Promise<string>;

export interface Template<TExports = {}> {
  __errors?: TExports;
  __type: 'Template';
  generate: GenerateFn;
}
