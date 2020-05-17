import json5 from 'json5';
import {merge} from 'lodash';
import {dirname, resolve} from 'path';
import {getJson} from './getJson';
import {TsConfigJson} from './getTsConfigJson';

export const resolveExtendedTsConfig = async (
  wsTsConfigJson: TsConfigJson,
  wsRoot: string
): Promise<TsConfigJson> => {
  if (!wsTsConfigJson.extends) return wsTsConfigJson;

  const pathToBase = resolve(wsRoot, wsTsConfigJson.extends);

  let base = await getJson<TsConfigJson>('', pathToBase);

  if (!base) {
    base = json5.parse(require.resolve(wsTsConfigJson.extends)) as TsConfigJson;

    if (!base) {
      throw `'tsconfig.json' at ${wsRoot} extends ${wsTsConfigJson.extends}, but it doesn't exist.`;
    }
  }

  const resolvedBase = await resolveExtendedTsConfig(base, dirname(pathToBase));

  return merge({}, resolvedBase, wsTsConfigJson);
};
