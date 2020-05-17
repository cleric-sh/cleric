import {existsSync} from 'fs';
import {parse} from 'json5';
import {_readFile} from './getTsConfigJson';

export const getJson = async <T>(path: string) => {
  if (!existsSync(path)) return;

  const content = await _readFile(path, 'utf8');

  try {
    return parse(content) as T;
  } catch (error) {
    console.log(`Syntax error in ${path}`, error);
    return;
  }
};
