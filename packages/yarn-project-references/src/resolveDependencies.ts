import {existsSync} from 'fs';
import {join} from 'path';
import {PackageDependencies} from './getPackageJson';
import {RootInfo} from './getRootInfo';
import {TSCONFIG_FILE_NAME} from './getTsConfigJson';

export const resolveDependencies = (
  root: RootInfo,
  dependencies?: PackageDependencies
) => {
  if (!dependencies) return [];
  return Object.keys(dependencies)
    .map(dep => root.workspaces[dep])
    .filter(dep => !!dep)
    .filter(dep => {
      const path = join(root.path, dep.location, TSCONFIG_FILE_NAME);
      return existsSync(path);
    });
};
