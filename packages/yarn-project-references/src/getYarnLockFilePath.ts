import {existsSync} from 'fs';
import {join, resolve} from 'path';

const YARN_LOCK_FILE_NAME = 'yarn.lock';

/**
 * Returns the first parent of 'fromPath' that contains a yarn.lock file.
 * Returns 'fromPath' if it contains a yarn.lock file.
 * @param fromPath The starting path from which parents will be searched for a yarn.lock file.
 */
export const getYarnLockFilePath = (fromPath?: string): string => {
  const cwd = fromPath || process.cwd();
  const yarnLockPath = join(cwd, YARN_LOCK_FILE_NAME);
  const exists = existsSync(yarnLockPath);
  if (exists) return cwd;

  const parent = resolve(cwd, '..');
  return getYarnLockFilePath(parent);
};
