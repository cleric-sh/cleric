import {set} from 'lodash';
import {TsConfigJson} from '../getTsConfigJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';

export const ensureSourceMap = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  if (!ws.tsConfigJson.effective.compilerOptions?.sourceMap) {
    console.log(`  - Setting 'sourceMap' to true`);
    set(missingSettings, 'compilerOptions.sourceMap', true);
  }
};
