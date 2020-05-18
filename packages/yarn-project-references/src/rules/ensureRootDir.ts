import {existsSync} from 'fs';
import {set} from 'lodash';
import {join} from 'path';
import {SRC_NAME} from '../ensureWorkspacesTsConfigs';
import {TsConfigJson} from '../getTsConfigJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';
import {warnNoBaseRootDir} from './warnNoBaseRootDir';

export const ensureRootDir = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  warnNoBaseRootDir(ws);

  if (!ws.tsConfigJson.effective.compilerOptions?.rootDir) {
    const srcPath = join(ws.path, SRC_NAME);
    const srcExists = existsSync(srcPath);

    if (srcExists) {
      console.log(`  - Setting 'rootDir' to 'src'`);
      set(missingSettings, 'compilerOptions.rootDir', 'src');
    } else {
      console.log(`  - Skipping 'rootDir' (no /src, defaults to .)`);
    }
  }
};
