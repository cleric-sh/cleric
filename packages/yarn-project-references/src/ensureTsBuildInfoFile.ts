import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';

export const ensureTsBuildInfoFile = (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson
) => {
  const outDir = wsTsConfigJson.compilerOptions?.outDir || 'dist';
  if (!wsTsConfigJson.compilerOptions?.tsBuildInfoFile) {
    console.log(`  - Setting 'tsBuildInfoFile' to '${outDir}/.tsbuildinfo'`);
    set(
      missingSettings,
      'compilerOptions.tsBuildInfoFile',
      `${outDir}/.tsbuildinfo`
    );
  }
};
