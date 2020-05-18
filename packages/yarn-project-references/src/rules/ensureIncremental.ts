import {set} from 'lodash';
import {TsConfigJson} from '../getTsConfigJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';

export const ensureIncremental = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  if (!ws.tsConfigJson.effective.compilerOptions?.incremental) {
    console.log(`  - Setting 'incremental' to true`);
    set(missingSettings, 'compilerOptions.incremental', true);
  }
};
