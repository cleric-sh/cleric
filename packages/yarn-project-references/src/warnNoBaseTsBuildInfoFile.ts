import {WorkspaceInfo} from './getWorkspaceInfo';

export const warnNoBaseTsBuildInfoFile = (ws: WorkspaceInfo) => {
  const baseCompilerOptions = ws.tsConfigJson.base?.compilerOptions;

  if (baseCompilerOptions) {
    const {tsBuildInfoFile} = baseCompilerOptions;

    if (tsBuildInfoFile) {
      console.log(
        `  - WARNING: 'tsBuildInfoFile' is resolved relative to the tsConfig file it's in. Did you mean to include them in your base tsconfig?`
      );
    }
  }
};
