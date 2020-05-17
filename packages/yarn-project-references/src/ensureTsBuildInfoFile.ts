import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';

export const ensureTsBuildInfoFile = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  if (!wsTsConfigJson.compilerOptions?.tsBuildInfoFile) {
    console.log(`  - Setting 'tsBuildInfoFile' to 'dist/.tsbuildinfo'`);
    set(
      missingSettings,
      'compilerOptions.tsBuildInfoFile',
      'dist/.tsbuildinfo'
    );
  }
};
