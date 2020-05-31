import {flatMap} from 'lodash';
import {Workspace, Workspaces, getWorkspaces} from './getWorkspaces';
import {getYarnLockFilePath} from './getYarnLockFilePath';
import {tsConfigExists} from './tsConfigExists';

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
      return tsConfigExists(path, ws.location);
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
