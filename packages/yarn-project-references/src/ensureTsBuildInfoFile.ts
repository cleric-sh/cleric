import {set} from 'lodash';
import {TsConfigJson} from './getTsConfigJson';
import {WorkspaceInfo} from './getWorkspaceInfo';

export const ensureTsBuildInfoFile = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  const outDir = ws.tsConfigJson.effective.compilerOptions?.outDir || 'dist';
  if (!ws.tsConfigJson.effective.compilerOptions?.tsBuildInfoFile) {
    console.log(`  - Setting 'tsBuildInfoFile' to '${outDir}/.tsbuildinfo'`);
    set(
      missingSettings,
      'compilerOptions.tsBuildInfoFile',
      `${outDir}/.tsbuildinfo`
    );
  }
};
