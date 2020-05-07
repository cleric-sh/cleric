import {File} from '../file/File';
import {Directory} from './Directory';

export type DirectoryBuilder = {
  (name: string, nodes?: Array<Directory | File>): Directory;
};
