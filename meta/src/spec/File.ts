export type File = {
  __type: 'file';
  content: Promise<string> | string;
  name: string;
};
