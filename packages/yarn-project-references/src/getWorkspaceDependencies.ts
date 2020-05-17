import {WorkspaceInfo} from './getWorkspaceInfo';
import {resolveDependencies} from './resolveDependencies';

export const getWorkspaceDependencies = (ws: WorkspaceInfo) => {
  const {packageJson, root} = ws;

  const wsDeps = resolveDependencies(root, packageJson.dependencies);
  const wsDevDeps = resolveDependencies(root, packageJson.devDependencies);

  // Get unique workspaces.
  const set = new Set([...wsDeps, ...wsDevDeps]);

  return [...set];
};
