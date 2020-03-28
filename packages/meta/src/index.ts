import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {promisify} from 'util';

import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';

const packageJsonContent = packageJson`{
    "name": "testing"
}`;

const tsconfigContent = tsconfigJson`
{
    "compilerOptions": {
        "noImplicitAny": false
    }
}
`;

const outPath = '~/Projects/experiments/output'.replace('~', os.homedir());

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

type Context = {}

type File = {
  __type: 'file'; (ctx: Context): {}
}

type FileBuilder = {
  (name: string): File
}

const fil: FileBuilder =
    (name: string) => {
      return {} as File;
    }

type Directory = {
  __type: 'directory'; (ctx: Context): {}
}

type DirectoryBuilder = {
  (name: string, nodes?: Array<Directory|File>): Directory
}

const dir: DirectoryBuilder = (name, nodes):
    Directory => {
      return {} as Directory;
    }

dir('', [fil('package.json'), fil('tsconfig.json'), dir('src')])

const root =
    (
        path: string,
        ) => {
      // Resolve the '~' character to OS's home dir, if it is used.
      path = path.replace('~', os.homedir());
    }

const generate = async (filename: string, content: string) => {
  const filePath = path.join(outPath, filename);

  if (!await exists(outPath)) {
    await mkdir(outPath);
  }

  await writeFile(filePath, content);
} generate('package.json', packageJsonContent);
generate('tsconfig.json', tsconfigContent);