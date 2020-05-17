import {existsSync} from 'fs';
import {join} from 'path';
import {PackageDependencies} from './getPackageJson';
import {TSCONFIG_FILE_NAME} from './getTsConfigJson';
import {Workspaces} from './getWorkspaces';

export const getDependencies = (
  root: string,
  workspaces: Workspaces,
  dependencies?: PackageDependencies
) => {
  if (!dependencies) return [];
  return Object.keys(dependencies)
    .map(dep => workspaces[dep])
    .filter(ws => !!ws)
    .filter(ws => {
      const path = join(root, ws.location, TSCONFIG_FILE_NAME);
      return existsSync(path);
    });
};
