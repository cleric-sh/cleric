import {File} from './File';

export type Directory = {
  __type: 'directory';
  name: string;
  nodes?: Array<Directory | File>;
};
