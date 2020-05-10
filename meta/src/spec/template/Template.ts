import {Context} from './Context';

export interface Template<TExports = {}> {
  __exports: TExports; // Dummy field to disable intellisense wanting to remove TExports.
  __type: 'Template';
  generate: (ctx: Context) => Promise<string>;
}
