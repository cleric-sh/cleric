import {existsSync} from 'fs';
import {parse} from 'json5';
import {join} from 'path';
import {_readFile} from './getTsConfigJson';

export const getJson = async <T>(wsRoot: string, fileName: string) => {
  const path = join(wsRoot, fileName);

  if (!existsSync(path)) return;

  const content = await _readFile(path, 'utf8');

  try {
    return parse(content) as T;
  } catch (error) {
    console.log(`Syntax error in ${fileName} at: ${path}`, error);
    return;
  }
};
