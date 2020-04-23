import * as path from 'path';

import {writeFile} from '../util/fs';
import {WriteContext} from './WriteContext';

export const generateFile = async (
  ctx: WriteContext,
  filename: string,
  content: Promise<string> | string
) => {
  const {basePath, currentPath} = ctx;
  const filePath = path.join(basePath, currentPath, filename);
  console.log('f:', path.join('/', currentPath, filename));
  await writeFile(filePath, await content);
};
