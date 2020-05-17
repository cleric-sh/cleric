import {flatMap} from 'lodash';
import {join} from 'path';
import {getMissingReferences} from './getMissingReferences';
import {getPackageJson} from './getPackageJson';
import {getReferencedWorkspaces} from './getReferencedWorkspaces';
import {TsConfigJson, getTsConfigJson} from './getTsConfigJson';
import {getWorkspaces} from './getWorkspaces';
import {getYarnLockFilePath} from './getYarnLockFilePath';
import {writeTsConfigJson} from './writeTsConfigJson';

export const ensureProjectReferences = async () => {
  const root = getYarnLockFilePath();
  const workspaces = getWorkspaces();

  const referencedWorkspaces = new Set(
    flatMap(
      Object.keys(workspaces),
      pkg => workspaces[pkg].workspaceDependencies
    )
  );

  for (const wsPackageName in workspaces) {
    const ws = workspaces[wsPackageName];
    const wsRoot = join(root, ws.location);

    const wsTsConfigJson = await getTsConfigJson(wsRoot);
    if (!wsTsConfigJson) continue;

    const wsReferences = wsTsConfigJson.references;
    const existingRefs = new Set(wsReferences?.map(ref => ref.path) || []);

    const packageJson = await getPackageJson(wsRoot);

    if (!packageJson)
      throw (
        `Unable to find package.json in workspace ${wsPackageName} at ` + wsRoot
      );

    const refWorkspaces = getReferencedWorkspaces(workspaces, packageJson);

    const missingReferences = getMissingReferences(
      refWorkspaces,
      ws,
      existingRefs
    );

    if (missingReferences.length > 0) {
      const updatedReferences = [...(wsReferences || []), ...missingReferences];

      console.log(
        `Adding references to ${wsPackageName}:\n  - ${missingReferences
          .map(ref => ref.path)
          .join('\n  - ')}`
      );

      const missingSettings: TsConfigJson = {
        references: updatedReferences,
      };

      if (referencedWorkspaces.has(wsPackageName)) {
        if (!wsTsConfigJson.composite) {
          console.log(`  - Setting 'composite' to true`);
          missingSettings.composite = true;
        }
      }

      const content = {...wsTsConfigJson, ...missingSettings};
      await writeTsConfigJson(wsRoot, content);
    }
  }
};
