import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';

export const ensureSourceMap = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.compilerOptions?.sourceMap) {
    console.log(`  - Setting 'sourceMap' to true`);
    set(missingSettings, 'compilerOptions.sourceMap', true);
  }
};
