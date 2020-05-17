import {existsSync} from 'fs';
import {set} from 'lodash';
import {join} from 'path';
import {SRC_NAME} from './ensureWorkspacesTsConfigs';
import {TsConfigJson} from './getTsConfigJson';

export const ensureRootDir = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson,
  wsRoot: string
) => {
  if (!wsTsConfigJson.compilerOptions?.rootDir) {
    const srcPath = join(wsRoot, SRC_NAME);
    const srcExists = existsSync(srcPath);

    if (srcExists) {
      console.log(`    - Setting 'rootDir' to 'src'`);
      set(missingSettings, 'compilerOptions.rootDir', 'src');
    } else {
      console.log(`    - Skipping 'rootDir' (no /src, defaults to .)`);
    }
  }
};
