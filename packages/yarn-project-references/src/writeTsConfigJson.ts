import {writeFile} from 'fs';
import {join} from 'path';
import {promisify} from 'util';
import {TSCONFIG_FILE_NAME, TsConfigJson} from './getTsConfigJson';

const _writeFile = promisify(writeFile);

export const writeTsConfigJson = async (
  wsRoot: string,
  tsConfigJson: TsConfigJson
) => {
  const path = join(wsRoot, TSCONFIG_FILE_NAME);
  const content = JSON.stringify(tsConfigJson, null, 2);
  await _writeFile(path, content);
};
