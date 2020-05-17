import {merge} from 'lodash';
import {join} from 'path';
import {getJson} from './getJson';
import {RootInfo} from './getRootInfo';
import {TSCONFIG_FILE_NAME, TsConfigJson} from './getTsConfigJson';
import {writeJson} from './writeTsConfigJson';

export const writeSolutionFile = async (root: RootInfo) => {
  const path = join(root.path, TSCONFIG_FILE_NAME);

  const solutionTsConfig = await getJson<TsConfigJson>(path);

  const references = Array.from(root.packages.hasTsConfig)
    .map(pkg => root.workspaces[pkg])
    .map(ws => ({path: ws.location}));

  await writeJson(path, merge({}, solutionTsConfig, {references: references}));
};
