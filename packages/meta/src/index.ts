import * as fs from 'fs';
import { promisify } from 'util';
import * as path from 'path';
import { packageSchema } from "./schemas/json/package";
import { curry } from "ramda";
import { json } from './generators/json';
import * as os from "os";

const packageJson = curry(json)(packageSchema);

const content = packageJson`{
    "name": "testing",
    "foo": "tests"
}`;

const outPath = "~/Projects/experiments/output".replace("~", os.homedir());
const file = "package.json";

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const generate = async () => {
    const filePath = path.join(outPath, file);


    const dirExists = await exists(outPath);

    if (!dirExists) {
        console.log("making...")
        await mkdir(outPath);
        console.log("made...")
    }

    writeFile(filePath, content);
}
generate();