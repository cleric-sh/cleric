import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';

export const ensureDeclarationMap = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.compilerOptions?.declarationMap) {
    console.log(`  - Setting 'declarationMap' to true`);
    set(missingSettings, 'compilerOptions.declarationMap', true);
  }
};
