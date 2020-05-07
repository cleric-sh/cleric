import {Directory} from './Directory';
import {DirectoryBuilder} from './DirectoryBuilder';

export const d: DirectoryBuilder = (name, nodes): Directory => {
  return {__type: 'directory', name, nodes};
};
