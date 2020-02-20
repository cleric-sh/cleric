import * as fs from 'fs';
import { promisify } from 'util';
import * as path from 'path';
import schema from "./schemas/json/package";
import { curry } from "ramda";
import { json } from './generators/json';

const packageJson = curry(json)(schema);

const content = packageJson(`{
    "name": "test"
}`);

const outPath = path.join(__dirname, "../out");
const file = "package.json";

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const generate = async () => {
    const filePath = path.join(outPath, file);


    const dirExists = await exists(outPath);

    if (!dirExists) {
        await mkdir(outPath);
    }

    writeFile(filePath, content);
}
generate();