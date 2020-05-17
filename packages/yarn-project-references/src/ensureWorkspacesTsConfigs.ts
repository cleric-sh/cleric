import {merge} from 'lodash';
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
import {getRootInfo} from './getRootInfo';
import {TsConfigJson} from './getTsConfigJson';
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

    const missingSettings: TsConfigJson = {};

    console.log(
      `${packageName} - Checking tsconfig settings: ${
        ws.isDependency ? `(Dependency)` : ``
      }`
    );

    await ensureReferences(ws, missingSettings);

    ensureComposite(ws, missingSettings);
    ensureIncremental(ws, missingSettings);
    ensureFilesOrInclude(ws, missingSettings);
    ensureRootDir(ws, missingSettings);
    ensureDeclaration(ws, missingSettings);
    ensureDeclarationMap(ws, missingSettings);
    ensureSourceMap(ws, missingSettings);
    ensureOutDir(ws, missingSettings);
    ensureTsBuildInfoFile(ws, missingSettings);

    if (Object.keys(missingSettings).length === 0) {
      console.log('  - all settings ok!');
      continue;
    }

    const content = merge({}, ws.tsConfigJson.immediate, missingSettings);

    await writeTsConfigJson(ws.path, content);
  }
  console.log('');
};
