export interface Export<T extends string> {
  __type: 'Export';
  name: T;
}
