import {merge} from 'lodash';
import {dirname} from 'path';
import {getBaseTsConfig} from './getBaseTsConfig';
import {TsConfigJson} from './getTsConfigJson';

export const getEffectiveTsConfig = async (
  wsTsConfigJson: TsConfigJson,
  wsRoot: string
): Promise<TsConfigJson> => {
  if (!wsTsConfigJson.extends) return wsTsConfigJson;

  const result = await getBaseTsConfig(wsRoot, wsTsConfigJson);

  if (!result) {
    throw `'tsconfig.json' at ${wsRoot} extends ${wsTsConfigJson.extends}, but it doesn't exist.`;
  }

  const {base, basePath} = result;

  const resolvedBase = await getEffectiveTsConfig(base, dirname(basePath));

  return merge({}, resolvedBase, wsTsConfigJson);
};
