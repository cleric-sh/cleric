import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';

export const ensureComposite = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.compilerOptions?.composite) {
    console.log(`    - Setting 'composite' to true`);
    set(missingSettings, 'compilerOptions.composite', true);
  }
};
