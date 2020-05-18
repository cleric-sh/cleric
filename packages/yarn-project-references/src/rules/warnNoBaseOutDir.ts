import {WorkspaceInfo} from '../getWorkspaceInfo';

export const warnNoBaseOutDir = (ws: WorkspaceInfo) => {
  const baseCompilerOptions = ws.tsConfigJson.base?.compilerOptions;

  if (baseCompilerOptions) {
    const {outDir} = baseCompilerOptions;

    if (outDir) {
      console.log(
        `  - WARNING: 'outDir' is resolved relative to the tsConfig file it's in. Did you mean to include them in your base tsconfig?`
      );
    }
  }
};
