import * as path from 'path';

import {Template} from '../spec/template/Template';
import {isTemplate} from '../spec/template/isTemplate';
import {MaybePromise} from '../util/MaybePromise';
import {writeFile} from '../util/fs';
import {WriteContext} from './WriteContext';

export const generateFile = async (
  ctx: WriteContext,
  filename: string,
  source: MaybePromise<Template | string>
) => {
  const {basePath, currentPath} = ctx;
  const filePath = path.join(basePath, currentPath, filename);
  console.log('f:', path.join('/', currentPath, filename));
  const templateOrString = await source;
  const content = isTemplate(templateOrString)
    ? await templateOrString.generate(ctx)
    : source;
  await writeFile(filePath, content);
};
