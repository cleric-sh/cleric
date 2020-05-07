import {File} from './File';

export type FileBuilder = {
  (name: string, content: Promise<string> | string): File;
};
