import {MaybePromise} from '../../util/MaybePromise';
import {Template} from '../template/Template';
import {File} from './File';

export type F = {
  <TExports = {}>(
    name: string,
    source: MaybePromise<Template<TExports> | string>
  ): File<TExports>;
};

export const f: F = (name, source) => {
  return {__type: 'file', name, source};
};
