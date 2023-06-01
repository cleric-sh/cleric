import * as fs from 'fs';
import {Misc} from 'ts-toolbelt';

export function createJsonFile(path: string, json: Misc.JSON.Value) {
  fs.writeFileSync(path, JSON.stringify(json), {encoding: 'utf8'});
}
