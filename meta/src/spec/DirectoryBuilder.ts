import {Directory} from './Directory';
import {File} from './File';

export type DirectoryBuilder = {
  (name: string, nodes?: Array<Directory | File>): Directory;
};
