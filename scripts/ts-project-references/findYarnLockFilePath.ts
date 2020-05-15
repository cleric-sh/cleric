import {existsSync} from 'fs';
import {join, resolve} from 'path';

const YARN_LOCK_FILE_NAME = 'yarn.lock';

export const findYarnLockFilePath = (fromPath?: string): string => {
  const cwd = fromPath || process.cwd();
  const yarnLockPath = join(cwd, YARN_LOCK_FILE_NAME);
  const exists = existsSync(yarnLockPath);
  if (exists) return cwd;

  const parent = resolve(cwd, '..');
  return findYarnLockFilePath(parent);
};
