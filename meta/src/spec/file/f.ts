import {MaybePromise} from '../../util/MaybePromise';
import {Template} from '../template/Template';
import {File} from './File';

export type F = {
  (name: string, content: MaybePromise<Template | string>): File;
};

export const f: F = (name, content) => {
  return {__type: 'file', content, name};
};
