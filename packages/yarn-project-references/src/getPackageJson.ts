import {existsSync, readFileSync} from 'fs';
import {parse} from 'json5';
import {join} from 'path';

const PACKAGE_JSON_FILE_NAME = 'package.json';

export type PackageDependencies = {
  [packageName: string]: unknown;
};

export type PackageJson = {
  dependencies?: PackageDependencies;
  devDependencies?: PackageDependencies;
};

export const getPackageJson = (wsRoot: string) => {
  const path = join(wsRoot, PACKAGE_JSON_FILE_NAME);
  if (!existsSync(path)) return;

  const content = readFileSync(path, 'utf8');

  try {
    return parse(content) as PackageJson;
  } catch (error) {
    console.log(`Syntax error in tsconfig at: ${path}`, error);
    return;
  }
};
