import {flatMap} from 'lodash';
import {join} from 'path';
import {ensureComposite} from './ensureComposite';
import {ensureDeclaration} from './ensureDeclaration';
import {ensureFilesOrInclude} from './ensureFilesOrInclude';
import {getMissingReferences} from './getMissingReferences';
import {getPackageJson} from './getPackageJson';
import {getReferencedWorkspaces} from './getReferencedWorkspaces';
import {TsConfigJson, getTsConfigJson} from './getTsConfigJson';
import {getWorkspaces} from './getWorkspaces';
import {getYarnLockFilePath} from './getYarnLockFilePath';
import {writeTsConfigJson} from './writeTsConfigJson';

export const SRC_NAME = 'src';
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
      console.log(
        `Adding references to ${wsPackageName}:\n  - ${missingReferences
          .map(ref => ref.path)
          .join('\n  - ')}`
      );

      const missingSettings: TsConfigJson = {
        references: [...(wsReferences || []), ...missingReferences],
      };

      if (referencedWorkspaces.has(wsPackageName)) {
        console.log(`  - workspace is referenced, checking required settings:`);

        ensureComposite(wsTsConfigJson, missingSettings);
        ensureFilesOrInclude(wsTsConfigJson, wsRoot, missingSettings);
        ensureDeclaration(wsTsConfigJson, missingSettings);
      }

      const content = {...wsTsConfigJson, ...missingSettings};
      await writeTsConfigJson(wsRoot, content);
    }
  }
};
