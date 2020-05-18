import {set} from 'lodash';
import {TsConfigJson} from '../getTsConfigJson';
import {WorkspaceInfo} from '../getWorkspaceInfo';
import {warnNoBaseTsBuildInfoFile} from './warnNoBaseTsBuildInfoFile';

export const ensureTsBuildInfoFile = (
  ws: WorkspaceInfo,
  missingSettings: TsConfigJson
) => {
  warnNoBaseTsBuildInfoFile(ws);
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
