import {readFile} from 'fs';
import {promisify} from 'util';
import {getJson} from './getJson';

export const _readFile = promisify(readFile);

export const TSCONFIG_FILE_NAME = 'tsconfig.json';

export type Reference = {
  path: string;
};

export type TsConfigJson = {
  compilerOptions?: {
    declaration?: boolean;
  };
  composite?: boolean;
  files?: string[];
  include?: string[];
  references?: Reference[];
};

export const getTsConfigJson = (wsRoot: string) =>
  getJson<TsConfigJson>(wsRoot, TSCONFIG_FILE_NAME);
