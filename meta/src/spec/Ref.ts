import {Context} from './template/Context';

export interface Ref {
  __type: 'Ref';
  name: string;
  getPath: (ctx: Context) => string;
}
