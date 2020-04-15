import {FileBuilder} from './FileBuilder';

export const f: FileBuilder = (name, content) => {
  return {__type: 'file', name, content};
};
