import {PackageDependencies} from './getPackageJson';
import {RootInfo} from './getRootInfo';
import {tsConfigExists} from './tsConfigExists';

export const resolveDependencies = (
  root: RootInfo,
  dependencies?: PackageDependencies
) => {
  if (!dependencies) return [];
  return Object.keys(dependencies)
    .map(dep => root.workspaces[dep])
    .filter(dep => !!dep)
    .filter(dep => {
      return tsConfigExists(root.path, dep.location);
    });
};
