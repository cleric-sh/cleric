import {Directory} from '../spec/Directory';
import {File} from '../spec/File';
import {createWriteContext} from './createWriteContext';
import {generateNodes} from './generateNodes';

export const generate = async (
  basePath: string,
  nodes: Array<Directory | File>
) => {
  const ctx = createWriteContext(basePath);
  generateNodes(ctx, nodes);
};
