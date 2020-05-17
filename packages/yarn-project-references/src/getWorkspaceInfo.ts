import {join} from 'path';
import {getBaseTsConfig} from './getBaseTsConfig';
import {getEffectiveTsConfig} from './getEffectiveTsConfig';
import {getJson} from './getJson';
import {PACKAGE_JSON_FILE_NAME, PackageJson} from './getPackageJson';
import {RootInfo} from './getRootInfo';
import {TSCONFIG_FILE_NAME, TsConfigJson} from './getTsConfigJson';
import {Workspace} from './getWorkspaces';

export type WorkspaceInfo = {
  isDependency: boolean;
  packageJson: PackageJson;
  packageJsonPath: string;
  path: string;
  root: RootInfo;
  tsConfigJson: {
    base?: TsConfigJson;
    basePath?: string;
    effective: TsConfigJson;
    immediate: TsConfigJson;
    immediatePath: string;
  };
  workspace: Workspace;
};

export const getWorkspaceInfo = async (
  root: RootInfo,
  packageName: string
): Promise<WorkspaceInfo | undefined> => {
  const workspace = root.workspaces[packageName];
  const path = join(root.path, workspace.location);

  const packageJsonPath = join(path, PACKAGE_JSON_FILE_NAME);
  const packageJson = await getJson<PackageJson>(packageJsonPath);

  if (!packageJson) throw `Unable to find'package.json' at workspace: ${path}`;

  const immediatePath = join(path, TSCONFIG_FILE_NAME);
  const immediate = await getJson<TsConfigJson>(immediatePath);
  if (!immediate) return;

  const base = await getBaseTsConfig(path, immediate);

  const effective = await getEffectiveTsConfig(immediate, path);

  const isDependency = root.packages.isReferenced.has(packageName);

  return {
    isDependency,
    packageJson,
    packageJsonPath,
    path,
    root,
    tsConfigJson: {
      effective,
      immediate,
      immediatePath,
      ...(base || {}),
    },
    workspace,
  };
};
