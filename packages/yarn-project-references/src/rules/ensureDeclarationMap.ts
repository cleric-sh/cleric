import {set} from 'lodash';
import {TsConfigJson} from '../getTsConfigJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';

export const ensureDeclarationMap = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  if (!ws.tsConfigJson.effective.compilerOptions?.declarationMap) {
    console.log(`  - Setting 'declarationMap' to true`);
    set(missingSettings, 'compilerOptions.declarationMap', true);
  }
};
