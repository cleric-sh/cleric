import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';
import {WorkspaceInfo} from './getWorkspaceInfo';

export const ensureDeclaration = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  if (!ws.tsConfigJson.effective.compilerOptions?.declaration) {
    console.log(`  - Setting 'declaration' to true`);
    set(missingSettings, 'compilerOptions.declaration', true);
  }
};
