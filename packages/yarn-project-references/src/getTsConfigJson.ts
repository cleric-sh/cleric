import {existsSync, readFileSync} from 'fs';
import {parse} from 'json5';
import {join} from 'path';

export const TSCONFIG_FILE_NAME = 'tsconfig.json';

export type Reference = {
  path: string;
};

export type TsConfigJson = {
  composite?: boolean;
  references?: Reference[];
};

export const getTsConfigJson = (wsRoot: string) => {
  const path = join(wsRoot, TSCONFIG_FILE_NAME);
  if (!existsSync(path)) return;

  const content = readFileSync(path, 'utf8');

  try {
    return parse(content) as TsConfigJson;
  } catch (error) {
    console.log(`Syntax error in  at: ${path}`, error);
    return;
  }
};
