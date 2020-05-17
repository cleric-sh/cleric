export const PACKAGE_JSON_FILE_NAME = 'package.json';

export type PackageDependencies = {
  [packageName: string]: unknown;
};

export type PackageJson = {
  dependencies?: PackageDependencies;
  devDependencies?: PackageDependencies;
  ['local:main']?: string;
  main?: string;
  types?: string;
};
