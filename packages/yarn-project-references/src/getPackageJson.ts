import {getJson} from './getJson';

const PACKAGE_JSON_FILE_NAME = 'package.json';

export type PackageDependencies = {
  [packageName: string]: unknown;
};

export type PackageJson = {
  dependencies?: PackageDependencies;
  devDependencies?: PackageDependencies;
};

export const getPackageJson = (wsRoot: string) =>
  getJson<PackageJson>(wsRoot, PACKAGE_JSON_FILE_NAME);
