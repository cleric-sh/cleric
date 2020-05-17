import {PackageJson} from './getPackageJson';
import {getWorkspaceDependencies} from './getWorkspaceDependencies';
import {Workspaces} from './getWorkspaces';

export const getReferencedWorkspaces = (
  workspaces: Workspaces,
  packageJson: PackageJson
) => {
  const wsDeps = getWorkspaceDependencies(workspaces, packageJson.dependencies);

  const wsDevDeps = getWorkspaceDependencies(
    workspaces,
    packageJson.devDependencies
  );
  // Get unique workspaces.
  const set = new Set([...wsDeps, ...wsDevDeps]);

  return [...set];
};
