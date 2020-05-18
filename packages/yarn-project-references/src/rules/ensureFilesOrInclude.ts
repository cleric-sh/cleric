import {existsSync} from 'fs';
import {join} from 'path';
import {SRC_NAME} from '../ensureWorkspacesTsConfigs';
import {TsConfigJson} from '../getTsConfigJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';
import {warnNoBaseFilesIncludeExclude} from './warnNoBaseFilesIncludeExclude';

export const ensureFilesOrInclude = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  warnNoBaseFilesIncludeExclude(ws);

  if (!(ws.tsConfigJson.effective.files || ws.tsConfigJson.effective.include)) {
    const srcPath = join(ws.path, SRC_NAME);
    const srcExists = existsSync(srcPath);

    if (srcExists) {
      console.log(`  - Including '/src/**/*.ts' by default`);
      missingSettings.include = ['src/**/*'];
    } else {
      console.log(`  - Including '**/*' by default`);
      missingSettings.include = ['**/*'];
    }
  }
};
