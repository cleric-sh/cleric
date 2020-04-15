import * as path from 'path';

import {WriteContext} from './WriteContext';
import {writeFile} from '../util/fs';

export const generateFile = async (
  ctx: WriteContext,
  filename: string,
  content: string
) => {
  const {basePath, currentPath} = ctx;
  const filePath = path.join(basePath, currentPath, filename);
  console.log('f:', path.join('/', currentPath, filename));
  await writeFile(filePath, content);
};
