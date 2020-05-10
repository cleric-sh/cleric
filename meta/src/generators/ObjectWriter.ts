export type ObjectWriter<T extends object> = {
  (value: T): Promise<string>;
};
