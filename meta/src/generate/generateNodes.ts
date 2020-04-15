import * as path from 'path';

import {generateDirectory} from './generateDirectory';
import {Directory} from '../spec/Directory';
import {File} from '../spec/File';
import {generateFile} from './generateFile';
import {WriteContext} from './WriteContext';

export const generateNodes = async (
  ctx: WriteContext,
  nodes: Array<Directory | File>
) => {
  const {currentPath} = ctx;
  for (const node of nodes) {
    switch (node.__type) {
      case 'file': {
        await generateFile(ctx, node.name, node.content);
        break;
      }
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
    }
  }
};
