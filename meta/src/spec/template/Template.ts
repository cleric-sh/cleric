import {Context} from './Context';

export interface Template<TExports = {}> {
  __errors: TExports;
  __type: 'Template';
  generate: (ctx: Context) => Promise<string>;
}
