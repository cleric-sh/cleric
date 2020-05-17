import {join, merge} from 'lodash';
import {ensureComposite} from './ensureComposite';
import {ensureDeclaration} from './ensureDeclaration';
import {ensureDeclarationMap} from './ensureDeclarationMap';
import {ensureFilesOrInclude} from './ensureFilesOrInclude';
import {ensureIncremental} from './ensureIncremental';
import {ensureOutDir} from './ensureOutDir';
import {ensurePackageJsonEntry} from './ensurePackageJsonEntry';
import {ensureReferences} from './ensureReferences';
import {ensureRootDir} from './ensureRootDir';
import {ensureSourceMap} from './ensureSourceMap';
import {ensureTsBuildInfoFile} from './ensureTsBuildInfoFile';
import {PackageJson} from './getPackageJson';
import {getRootInfo} from './getRootInfo';
import {TSCONFIG_FILE_NAME, TsConfigJson} from './getTsConfigJson';
import {getWorkspaceInfo} from './getWorkspaceInfo';
import {writeTsConfigJson} from './writeTsConfigJson';

export const SRC_NAME = 'src';

export const ensureWorkspacesTsConfigs = async () => {
  const root = getRootInfo();

  console.log(
    'Configuring typescript project references from yarn workspaces...'
  );

  for (const packageName of root.packages.hasTsConfig) {
    console.log('');

    const ws = await getWorkspaceInfo(root, packageName);

    if (!ws) continue;

    const newTsConfigJsonSettings: TsConfigJson = {};
    const newPackageJsonSettings: PackageJson = {};

    console.log(
      `${packageName} - Checking tsconfig settings: ${
        ws.isDependency ? `(Dependency)` : ``
      }`
    );

    await ensureReferences(ws, newTsConfigJsonSettings);

    ensureComposite(ws, newTsConfigJsonSettings);
    ensureIncremental(ws, newTsConfigJsonSettings);
    ensureFilesOrInclude(ws, newTsConfigJsonSettings);
    ensureRootDir(ws, newTsConfigJsonSettings);
    ensureDeclaration(ws, newTsConfigJsonSettings);
    ensureDeclarationMap(ws, newTsConfigJsonSettings);
    ensureSourceMap(ws, newTsConfigJsonSettings);
    ensureOutDir(ws, newTsConfigJsonSettings);
    ensureTsBuildInfoFile(ws, newTsConfigJsonSettings);
    ensurePackageJsonEntry(ws, newPackageJsonSettings);

    if (Object.keys(newTsConfigJsonSettings).length === 0) {
      console.log('  - all settings ok!');
      continue;
    }

    const content = merge(
      {},
      ws.tsConfigJson.immediate,
      newTsConfigJsonSettings
    );
    await writeTsConfigJson(ws.tsConfigJson.immediatePath, content);
  }
  console.log('');
};
