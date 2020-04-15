import * as os from 'os';

export const resolve = (path: string) => {
  // Resolve the '~' character to OS's home dir, if it is used.
  return path.replace('~', os.homedir());
};
