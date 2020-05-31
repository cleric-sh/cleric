import {existsSync} from 'fs';
import {flatMap} from 'lodash';
import {join} from 'path';
import {TSCONFIG_FILE_NAME, IGNORE_FILE_NAME} from './getTsConfigJson';
import {Workspaces, getWorkspaces} from './getWorkspaces';
import {getYarnLockFilePath} from './getYarnLockFilePath';

export type RootInfo = {
  packages: {
    hasTsConfig: Set<string>;
    isReferenced: Set<string>;
  };
  path: string;
  workspaces: Workspaces;
};

export const getRootInfo = (): RootInfo => {
  const path = getYarnLockFilePath();
  const workspaces = getWorkspaces();

  const hasTsConfig = new Set(
    Object.keys(workspaces).filter(pkg => {
      const ws = workspaces[pkg];
      const tsConfigPath = join(path, ws.location, TSCONFIG_FILE_NAME);
      const exists = existsSync(tsConfigPath);
      const ignoreFilePath = join(path, ws.location, IGNORE_FILE_NAME);
      const ignore = existsSync(ignoreFilePath);
      return exists && !ignore;
    })
  );

  const isReferenced = new Set(
    flatMap(
      Array.from(hasTsConfig),
      pkg => workspaces[pkg].workspaceDependencies
    )
  );

  return {
    packages: {
      hasTsConfig,
      isReferenced,
    },
    path,
    workspaces,
  };
};
