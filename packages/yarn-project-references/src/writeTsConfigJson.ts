import {writeFileSync} from 'fs';
import {join} from 'path';
import {TSCONFIG_FILE_NAME, TsConfigJson} from './getTsConfigJson';

export const writeTsConfigJson = (
  wsRoot: string,
  tsConfigJson: TsConfigJson
) => {
  const path = join(wsRoot, TSCONFIG_FILE_NAME);
  const content = JSON.stringify(tsConfigJson, null, 2);
  writeFileSync(path, content);
};
