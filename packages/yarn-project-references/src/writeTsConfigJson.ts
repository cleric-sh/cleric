import {writeFile} from 'fs';
import {promisify} from 'util';

const _writeFile = promisify(writeFile);

export const writeJson = async (path: string, json: object) => {
  const content = JSON.stringify(json, null, 2);
  await _writeFile(path, content);
};
