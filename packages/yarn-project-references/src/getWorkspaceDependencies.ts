import {getDependencies} from './getDependencies';
import {PackageJson} from './getPackageJson';
import {Workspaces} from './getWorkspaces';

export const getWorkspaceDependencies = (
  workspaces: Workspaces,
  packageJson: PackageJson
) => {
  const wsDeps = getDependencies(workspaces, packageJson.dependencies);

  const wsDevDeps = getDependencies(workspaces, packageJson.devDependencies);
  // Get unique workspaces.
  const set = new Set([...wsDeps, ...wsDevDeps]);

  return [...set];
};
