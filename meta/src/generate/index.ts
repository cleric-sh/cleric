import rimraf from 'rimraf';
import {Directory} from '../spec/directory/Directory';
import {File} from '../spec/file/File';
import {resolve} from '../util/resolve';
import {createWriteContext} from './createWriteContext';
import {generateDirectory} from './generateDirectory';
import {generateNodes} from './generateNodes';

export const generate = async (
  basePath: string,
  nodes: Array<Directory | File>,
  clearBefore = false
) => {
  const ctx = createWriteContext(basePath);
  if (clearBefore) {
    console.log(`Clearing: ${basePath}`);
    rimraf.sync(resolve(basePath));
  }
  console.log(`Generating to: ${basePath}`);
  await generateDirectory(ctx, '');
  await generateNodes(ctx, nodes);
};
