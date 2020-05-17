import {getMissingReferences} from './getMissingReferences';
import {getPackageJson} from './getPackageJson';
import {TsConfigJson} from './getTsConfigJson';
import {getWorkspaceDependencies} from './getWorkspaceDependencies';
import {Workspace, Workspaces} from './getWorkspaces';

export const ensureReferences = async (
  wsTsConfigJson: TsConfigJson,
  missingSettings: TsConfigJson,
  wsRoot: string,
  wsPackageName: string,
  workspaces: Workspaces,
  ws: Workspace
) => {
  const wsReferences = wsTsConfigJson.references;
  const existingRefs = new Set(wsReferences?.map(ref => ref.path) || []);

  const packageJson = await getPackageJson(wsRoot);

  if (!packageJson)
    throw (
      `Unable to find package.json in workspace ${wsPackageName} at ` + wsRoot
    );

  const refWorkspaces = getWorkspaceDependencies(workspaces, packageJson);

  const missingReferences = getMissingReferences(
    refWorkspaces,
    ws,
    existingRefs
  );

  if (missingReferences.length > 0) {
    console.log(`  - adding project references:`);
    missingReferences.forEach(ref => console.log(`    - ${ref.path}`));

    missingSettings.references = [
      ...(wsReferences || []),
      ...missingReferences,
    ];
  }
};
