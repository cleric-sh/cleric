import {getDependencies} from './getDependencies';
import {PackageJson} from './getPackageJson';
import {Workspaces} from './getWorkspaces';

export const getWorkspaceDependencies = (
  root: string,
  workspaces: Workspaces,
  packageJson: PackageJson
) => {
  const wsDeps = getDependencies(root, workspaces, packageJson.dependencies);

  const wsDevDeps = getDependencies(
    root,
    workspaces,
    packageJson.devDependencies
  );
  // Get unique workspaces.
  const set = new Set([...wsDeps, ...wsDevDeps]);

  return [...set];
};
