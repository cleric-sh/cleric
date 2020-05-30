import * as fs from 'fs';
import * as path from 'path';

import {mkdir} from '../util/fs';
import {WriteContext} from './WriteContext';

export const generateDirectory = async (ctx: WriteContext, name: string) => {
  const {basePath, currentPath} = ctx;

  const dirPath = path.join(basePath, currentPath, name);

  console.log('d:', path.join('/', currentPath, name));

  if (!fs.existsSync(dirPath)) {
    await mkdir(dirPath);
  }
};
