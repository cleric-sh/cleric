import {flatMap} from 'lodash';
import {join} from 'path';
import {ensureComposite} from './ensureComposite';
import {ensureDeclaration} from './ensureDeclaration';
import {ensureFilesOrInclude} from './ensureFilesOrInclude';
import {ensureReferences} from './ensureReferences';
import {TsConfigJson, getTsConfigJson} from './getTsConfigJson';
import {getWorkspaces} from './getWorkspaces';
import {getYarnLockFilePath} from './getYarnLockFilePath';
import {resolveExtendedTsConfig} from './resolveExtendedTsConfig';
import {writeTsConfigJson} from './writeTsConfigJson';

export const SRC_NAME = 'src';

export const ensureWorkspacesConfigured = async () => {
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

    const tsConfig = await getTsConfigJson(wsRoot);
    if (!tsConfig) continue;

    const resolvedTsConfig = await resolveExtendedTsConfig(tsConfig, wsRoot);

    const missingSettings: TsConfigJson = {};

    console.log(`Checking tsconfig setting for ${wsPackageName}:`);

    await ensureReferences(
      resolvedTsConfig,
      missingSettings,
      wsRoot,
      wsPackageName,
      workspaces,
      ws
    );

    if (referencedWorkspaces.has(wsPackageName)) {
      console.log(`  - workspace is referenced, checking required settings:`);

      ensureComposite(resolvedTsConfig, missingSettings);
      ensureFilesOrInclude(resolvedTsConfig, wsRoot, missingSettings);
      ensureDeclaration(resolvedTsConfig, missingSettings);
    }

    if (missingSettings === {}) {
      console.log('  - Ok!');
      return;
    }

    const content = {...tsConfig, ...missingSettings};

    await writeTsConfigJson(wsRoot, content);
  }
};
