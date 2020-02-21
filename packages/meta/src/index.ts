import * as fs from 'fs';
import { promisify } from 'util';
import * as path from 'path';
import * as os from "os";
import { packageJson } from './generators/packageJson';

const c2 = packageJson({
    name: "test",
})

const content = packageJson`{
    "name": "testing"
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