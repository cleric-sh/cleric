import {WorkspaceInfo} from '../getWorkspaceInfo';

export const warnNoBaseRootDir = (ws: WorkspaceInfo) => {
  const baseCompilerOptions = ws.tsConfigJson.base?.compilerOptions;

  if (baseCompilerOptions) {
    const {rootDir} = baseCompilerOptions;

    if (rootDir) {
      console.log(
        `  - WARNING: 'rootDir' is resolved relative to the tsConfig file it's in. Did you mean to include them in your base tsconfig?`
      );
    }
  }
};
