import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';
import {WorkspaceInfo} from './getWorkspaceInfo';

export const ensureOutDir = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  if (!ws.tsConfigJson.effective.compilerOptions?.outDir) {
    console.log(`  - Setting 'outDir' to 'dist'`);
    set(missingSettings, 'compilerOptions.outDir', 'dist');
  }
};
