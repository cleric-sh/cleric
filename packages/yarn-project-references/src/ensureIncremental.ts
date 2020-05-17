import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';

export const ensureIncremental = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.compilerOptions?.incremental) {
    console.log(`    - Setting 'incremental' to true`);
    set(missingSettings, 'compilerOptions.incremental', true);
  }
};
