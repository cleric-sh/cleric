import {merge} from 'lodash';
import {PackageJson} from './getPackageJson';
import {getRootInfo} from './getRootInfo';
import {TsConfigJson} from './getTsConfigJson';
import {getWorkspaceInfo} from './getWorkspaceInfo';
import {ensureComposite} from './rules/ensureComposite';
import {ensureDeclaration} from './rules/ensureDeclaration';
import {ensureDeclarationMap} from './rules/ensureDeclarationMap';
import {ensureFilesOrInclude} from './rules/ensureFilesOrInclude';
import {ensureIncremental} from './rules/ensureIncremental';
import {ensureOutDir} from './rules/ensureOutDir';
import {ensurePackageJsonEntry} from './rules/ensurePackageJsonEntry';
import {ensureReferences} from './rules/ensureReferences';
import {ensureRootDir} from './rules/ensureRootDir';
import {ensureSourceMap} from './rules/ensureSourceMap';
import {ensureTsBuildInfoFile} from './rules/ensureTsBuildInfoFile';
import {writeJson} from './writeTsConfigJson';

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

    if (
      Object.keys(newTsConfigJsonSettings).length === 0 &&
      Object.keys(newPackageJsonSettings).length === 0
    ) {
      console.log('  - all settings ok!');
      continue;
    }

    const tsConfigJsonContent = merge(
      {},
      ws.tsConfigJson.immediate,
      newTsConfigJsonSettings
    );
    await writeJson(ws.tsConfigJson.immediatePath, tsConfigJsonContent);

    const packageJsonContent = merge(
      {},
      ws.packageJson,
      newPackageJsonSettings
    );
    await writeJson(ws.packageJsonPath, packageJsonContent);
  }
  console.log('');

  // await writeSolutionFile(root);
};
