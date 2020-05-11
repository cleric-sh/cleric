import {MaybePromise} from '../../util/MaybePromise';
import {Template} from '../template/Template';

export type File = {
  __type: 'file';
  content: MaybePromise<Template | string>;
  name: string;
};
