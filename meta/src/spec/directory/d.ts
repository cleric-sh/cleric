import {File} from '../file/File';
import {Directory} from './Directory';

export type D = {
  (name: string, nodes?: Array<Directory | File>): Directory;
};

export const d: D = (name, nodes): Directory => {
  return {__type: 'directory', name, nodes};
};
