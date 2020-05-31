import {readFile} from 'fs';
import {promisify} from 'util';

export const _readFile = promisify(readFile);

export const TSCONFIG_FILE_NAME = 'tsconfig.json';
export const IGNORE_FILE_NAME = '.yprignore';

export type Reference = {
  path: string;
};

export type TsConfigJson = {
  compilerOptions?: {
    composite?: boolean;
    declaration?: boolean;
    declarationMap?: boolean;
    incremental?: boolean;
    outDir?: string;
    rootDir?: string;
    sourceMap?: boolean;
    tsBuildInfoFile?: string;
  };
  exclude?: string[];
  extends?: string;
  files?: string[];
  include?: string[];
  references?: Reference[];
};
