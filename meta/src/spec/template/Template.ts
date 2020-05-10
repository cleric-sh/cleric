export interface Template<TExports = unknown> {
  exports: TExports;
  generate: () => Promise<string>;
}
