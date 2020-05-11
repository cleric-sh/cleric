import {WriteContext} from '../generate/WriteContext';

export interface Ref {
  __type: 'Ref';
  name: string;
  getPath: (ctx: WriteContext) => string;
}
