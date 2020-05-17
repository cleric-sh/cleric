import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';

export const ensureOutDir = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.compilerOptions?.outDir) {
    console.log(`    - Setting 'outDir' to 'dist'`);
    set(missingSettings, 'compilerOptions.outDir', 'dist');
  }
};
