import {existsSync} from 'fs';
import {join} from 'path';
import {TSCONFIG_FILE_NAME, IGNORE_FILE_NAME} from './getTsConfigJson';

export const tsConfigExists = (path: string, location: string) => {
  const tsConfigPath = join(path, location, TSCONFIG_FILE_NAME);
  const exists = existsSync(tsConfigPath);
  const ignoreFilePath = join(path, location, IGNORE_FILE_NAME);
  const ignore = existsSync(ignoreFilePath);
  return exists && !ignore;
};
