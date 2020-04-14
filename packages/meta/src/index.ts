import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import {promisify} from 'util';

import {packageJson} from './generators/packageJson';
import {tsconfigJson} from './generators/tsconfigJson';

const packageJsonContent = packageJson`{
    "name": "testing"
}`;

const tsConfigContent = tsconfigJson`
{
    "compilerOptions": {
        "noImplicitAny": false
    }
}
`;

const outPath = '~/Projects/experiments/output';
const outPathResolved = outPath.replace('~', os.homedir());

const stat = promisify(fs.stat);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

type WriteContext = {};

type BuildContext = {};

type File = {
  __type: 'file';
  name: string;
  content: string;
};

type FileBuilder = {
  (name: string, content: string): File;
};

const f: FileBuilder = (name, content) => {
  return {__type: 'file', name, content};
};

type Directory = {
  __type: 'directory';
  name: string;
  nodes?: Array<Directory | File>;
};

type DirectoryBuilder = {
  (name: string, nodes?: Array<Directory | File>): Directory;
};

const d: DirectoryBuilder = (name, nodes): Directory => {
  return {__type: 'directory', name, nodes};
};

/**
 * Spec
 * Spec + Args = Structure
 * Structure + Target = Instructions (to write to FS)
 *
 */
type Args = {foos: number[]};

const createFoos = (foos: number[]) =>
  foos.map(i => f(`foo${i}.ts`, `Foo${i}`));

const spec = (args: Args) =>
  d('', [
    f('package.json', packageJsonContent),
    f('tsconfig.json', tsConfigContent),
    d('src', [
      ...createFoos(args.foos),
      d('nested-dir', [
        f('testing.json', 'foo'),
        f('testing2.json', 'foo'),
        f('testing3.json', 'foo'),
      ]),
    ]),
  ]);

const structure = spec({foos: [1, 2, 3, 4]});

const resolve = (path: string) => {
  // Resolve the '~' character to OS's home dir, if it is used.
  return path.replace('~', os.homedir());
};

const generateDirectory = async (basePath: string, dir: Directory) => {
  const basePathResolved = resolve(basePath);

  if (!fs.existsSync(basePathResolved)) {
    await mkdir(basePathResolved);
  }

  const dirPath = path.join(basePathResolved, dir.name);
  console.log('creating directory:', dirPath);

  try {
    if (!fs.existsSync(dirPath)) {
      await mkdir(dirPath);
    }
  } catch (e) {
    console.log(`fucked up creating ${dirPath}: `, e);
  }

  const generateFile = async (filename: string, content: string) => {
    const filePath = path.join(dirPath, filename);
    console.log('creating file:', filePath);

    await writeFile(filePath, content);
  };

  if (!dir.nodes) return;

  for (const node of dir.nodes) {
    if (node.__type === 'file') {
      await generateFile(node.name, node.content);
    } else if (node.__type === 'directory') {
      await generateDirectory(dirPath, node);
    }
  }
};

generateDirectory(outPath, structure);

// generate('package.json', packageJsonContent);
// generate('tsconfig.json', tsConfigContent);
