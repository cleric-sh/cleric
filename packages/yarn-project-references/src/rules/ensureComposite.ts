import {set} from 'lodash';
import {TsConfigJson} from '../getTsConfigJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';

export const ensureComposite = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  if (!ws.tsConfigJson.effective.compilerOptions?.composite) {
    console.log(`  - Setting 'composite' to true`);
    set(missingSettings, 'compilerOptions.composite', true);
  }
};
