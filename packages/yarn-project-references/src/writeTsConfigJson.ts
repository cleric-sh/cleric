import {writeFile} from 'fs';
import {join} from 'path';
import {promisify} from 'util';
import {TSCONFIG_FILE_NAME, TsConfigJson} from './getTsConfigJson';

const _writeFile = promisify(writeFile);

export const writeTsConfigJson = async (
  path: string,
  tsConfigJson: TsConfigJson
) => {
  const content = JSON.stringify(tsConfigJson, null, 2);
  await _writeFile(path, content);
};
