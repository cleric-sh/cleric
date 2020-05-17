import {PackageDependencies} from './getPackageJson';
import {Workspaces} from './getWorkspaces';

export const getDependencies = (
  workspaces: Workspaces,
  dependencies?: PackageDependencies
) => {
  if (!dependencies) return [];
  return Object.keys(dependencies)
    .map(dep => workspaces[dep])
    .filter(ws => !!ws);
};
