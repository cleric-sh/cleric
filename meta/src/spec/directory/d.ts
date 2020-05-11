import {File} from '../file/File';
import {Directory} from './Directory';
import {ExportsOf} from './NodesExports';

export type D = {
  <TNodes extends Array<Directory | File>>(
    name: string,
    nodes?: TNodes
  ): Directory<ExportsOf<TNodes>>;
};

export const d: D = (name, nodes): Directory => {
  return {__type: 'directory', name, nodes};
};
