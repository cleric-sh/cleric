import * as fs from 'fs';
import {parse} from 'json5';
import {Misc} from 'ts-toolbelt';
import {ConfigurationError} from '../errors/ConfigurationError';

export function readJsonConfigFile(path: string) {
  let config: Misc.JSON.Value = null;
  try {
    console.log(`Read configuration file from ${path}`);
    const jsonString = fs.readFileSync(path, {encoding: 'utf8'});
    config = parse(jsonString);
  } catch (error) {
    console.error(`File '${path}' not found, loading empty object.`);
    return {};
  }

  if (typeof config !== 'object')
    throw new ConfigurationError(`The root of ConfigFile at '${path}' must be a JSON object.`);

  return config as Misc.JSON.Object;
}
