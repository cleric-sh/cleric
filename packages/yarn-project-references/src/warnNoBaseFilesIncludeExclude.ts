import {WorkspaceInfo} from './getWorkspaceInfo';

export const warnNoBaseFilesIncludeExclude = (ws: WorkspaceInfo) => {
  const base = ws.tsConfigJson.base;

  if (base) {
    const {exclude, files, include} = base;
    if (files || include || exclude) {
      console.log(
        `  - WARNING: 'files', 'include' and 'exclude' are resolved relative to the file they're in. Did you mean to include them in your base tsconfig?`
      );
    }
  }
};
