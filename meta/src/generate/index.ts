import {generateNodes} from './generateNodes';
import {createWriteContext} from './createWriteContext';
import {Directory} from '../spec/Directory';
import {File} from '../spec/File';

export const generate = async (
  basePath: string,
  nodes: Array<Directory | File>
) => {
  const ctx = createWriteContext(basePath);
  generateNodes(ctx, nodes);
};
