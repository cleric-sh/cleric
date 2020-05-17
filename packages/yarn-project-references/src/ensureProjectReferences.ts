import {join, relative} from 'path';
import {getPackageJson} from './getPackageJson';
import {Reference, getTsConfigJson} from './getTsConfigJson';
import {getUniqueWorkspaceDependencies} from './getUniqueWorkspaceDependencies';
import {getWorkspaces} from './getWorkspaces';
import {getYarnLockFilePath} from './getYarnLockFilePath';
import {writeTsConfigJson} from './writeTsConfigJson';

export const ensureProjectReferences = async () => {
  const root = getYarnLockFilePath();
  const workspaces = getWorkspaces();

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

    const refWorkspaces = getUniqueWorkspaceDependencies(
      workspaces,
      packageJson
    );

    const relativePaths = refWorkspaces.map(refWs =>
      relative(ws.location, refWs.location)
    );

    const requiredReferences = relativePaths.map(
      rel =>
        ({
          path: rel,
        } as Reference)
    );

    const missingReferences = requiredReferences.filter(
      ref => !existingRefs.has(ref.path)
    );

    if (missingReferences.length > 0) {
      const updatedReferences = [...(wsReferences || []), ...missingReferences];

      console.log(
        `Adding references to ${wsPackageName}:\n  - ${missingReferences
          .map(ref => ref.path)
          .join('\n  - ')}`
      );
      const content = {...wsTsConfigJson, references: updatedReferences};
      await writeTsConfigJson(wsRoot, content);
    }
  }
};
