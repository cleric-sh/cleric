import {flatMap, merge} from 'lodash';
import {join} from 'path';
import {ensureComposite} from './ensureComposite';
import {ensureDeclaration} from './ensureDeclaration';
import {ensureDeclarationMap} from './ensureDeclarationMap';
import {ensureFilesOrInclude} from './ensureFilesOrInclude';
import {ensureIncremental} from './ensureIncremental';
import {ensureOutDir} from './ensureOutDir';
import {ensureReferences} from './ensureReferences';
import {ensureRootDir} from './ensureRootDir';
import {ensureSourceMap} from './ensureSourceMap';
import {ensureTsBuildInfoFile} from './ensureTsBuildInfoFile';
import {TsConfigJson, getTsConfigJson} from './getTsConfigJson';
import {getWorkspaces} from './getWorkspaces';
import {getYarnLockFilePath} from './getYarnLockFilePath';
import {resolveExtendedTsConfig} from './resolveExtendedTsConfig';
import {writeTsConfigJson} from './writeTsConfigJson';

export const SRC_NAME = 'src';

export const ensureWorkspacesTsConfigs = async () => {
  const root = getYarnLockFilePath();
  const workspaces = getWorkspaces();

  const referencedWorkspaces = new Set(
    flatMap(
      Object.keys(workspaces),
      pkg => workspaces[pkg].workspaceDependencies
    )
  );

  console.log(
    'Configuring typescript project references from yarn workspaces...'
  );

  for (const wsPackageName in workspaces) {
    console.log('');
    const ws = workspaces[wsPackageName];
    const wsRoot = join(root, ws.location);

    const tsConfig = await getTsConfigJson(wsRoot);
    if (!tsConfig) {
      console.log(`${wsPackageName} - No tsconfig.json found, skipping...`);
      continue;
    }

    const resolvedTsConfig = await resolveExtendedTsConfig(tsConfig, wsRoot);

    const missingSettings: TsConfigJson = {};

    const isDependency = referencedWorkspaces.has(wsPackageName);

    console.log(
      `${wsPackageName} - Checking tsconfig settings: ${
        isDependency ? `(Dependency)` : ``
      }`
    );

    await ensureReferences(
      resolvedTsConfig,
      missingSettings,
      wsRoot,
      wsPackageName,
      workspaces,
      ws
    );

    if (isDependency) {
      ensureComposite(resolvedTsConfig, missingSettings);
      ensureIncremental(resolvedTsConfig, missingSettings);
      ensureFilesOrInclude(resolvedTsConfig, missingSettings, wsRoot);
      ensureRootDir(resolvedTsConfig, missingSettings, wsRoot);
      ensureDeclaration(resolvedTsConfig, missingSettings);
      ensureDeclarationMap(resolvedTsConfig, missingSettings);
      ensureSourceMap(resolvedTsConfig, missingSettings);
      ensureOutDir(resolvedTsConfig, missingSettings);
      ensureTsBuildInfoFile(resolvedTsConfig, missingSettings);
    }

    if (Object.keys(missingSettings).length === 0) {
      console.log('  - all settings ok!');
      continue;
    }

    const content = merge({}, tsConfig, missingSettings);

    await writeTsConfigJson(wsRoot, content);
  }
  console.log('');
};
