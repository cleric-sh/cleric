import {Nodes} from '../Nodes';

export type Directory<TExports = {}> = {
  __type: 'directory';
  name: string;
  nodes?: Nodes;
};
