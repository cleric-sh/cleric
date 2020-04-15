import {File} from './File';

export type FileBuilder = {
  (name: string, content: string): File;
};
