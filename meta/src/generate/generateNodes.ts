import * as path from 'path';

import {Directory} from '../spec/Directory';
import {File} from '../spec/File';
import {WriteContext} from './WriteContext';
import {generateDirectory} from './generateDirectory';
import {generateFile} from './generateFile';

export const generateNodes = async (
  ctx: WriteContext,
  nodes: Array<Directory | File>
) => {
  const {currentPath} = ctx;
  for (const node of nodes) {
    switch (node.__type) {
      case 'directory': {
        await generateDirectory(ctx, node.name);
        if (!node.nodes) break;
        const nextContext = {
          ...ctx,
          currentPath: path.join(currentPath, node.name),
        };
        await generateNodes(nextContext, node.nodes);
        break;
      }
      case 'file': {
        await generateFile(ctx, node.name, node.content);
        break;
      }
    }
  }
};
