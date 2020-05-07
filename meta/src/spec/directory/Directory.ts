import {Nodes} from '../Nodes';

export type Directory = {
  __type: 'directory';
  name: string;
  nodes?: Nodes;
};
