import * as fs from 'fs';
import { promisify } from 'util';
import * as path from 'path';
import * as os from "os";
import { packageJson } from './generators/packageJson';
import { tsconfigJson } from './generators/tsconfigJson';

const packageJsonContent = packageJson`{
    "name": "testing"
}`;

const tsconfigContent = tsconfigJson({
    compilerOptions: {
        noImplicitAny: false
    }
})

const outPath = "~/Projects/experiments/output".replace("~", os.homedir());

const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

const generate = async (filename: string, content: string) => {
    const filePath = path.join(outPath, filename);


    const dirExists = await exists(outPath);

    if (!dirExists) {
        console.log("making...")
        await mkdir(outPath);
        console.log("made...")
    }

    writeFile(filePath, content);
}
generate("package.json", packageJsonContent);
generate("tsconfig.json", tsconfigContent);