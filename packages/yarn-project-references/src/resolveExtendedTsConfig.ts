import {merge} from 'lodash';
import {dirname, resolve} from 'path';
import {getJson} from './getJson';
import {TsConfigJson} from './getTsConfigJson';

export const resolveExtendedTsConfig = async (
  wsTsConfigJson: TsConfigJson,
  wsRoot: string
): Promise<TsConfigJson> => {
  if (!wsTsConfigJson.extends) return wsTsConfigJson;

  let pathToBase = resolve(wsRoot, wsTsConfigJson.extends);
  console.log(pathToBase);
  let base = await getJson<TsConfigJson>('', pathToBase);

  if (!base) {
    pathToBase = require.resolve(wsTsConfigJson.extends);
    base = await getJson<TsConfigJson>('', pathToBase);

    if (!base) {
      throw `'tsconfig.json' at ${wsRoot} extends ${wsTsConfigJson.extends}, but it doesn't exist.`;
    }
  }

  const resolvedBase = await resolveExtendedTsConfig(base, dirname(pathToBase));

  return merge({}, resolvedBase, wsTsConfigJson);
};
