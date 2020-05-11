import {MaybePromise} from '../../util/MaybePromise';
import {Template} from '../template/Template';

export type File<TExports = {}> = {
  __type: 'file';
  name: string;
  source: MaybePromise<Template<TExports> | string>;
};
