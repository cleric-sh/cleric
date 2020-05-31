import {resolve} from 'path';
import {getJson} from './getJson';
import {TsConfigJson} from './getTsConfigJson';

export const getBaseTsConfig = async (
  wsRoot: string,
  tsConfig: TsConfigJson
) => {
  if (!tsConfig.extends) return undefined;

  const basePath = require.resolve(tsConfig.extends, {paths: [wsRoot]});
  const base = await getJson<TsConfigJson>(basePath);

  // let basePath = resolve(wsRoot, tsConfig.extends);
  // let base = await getJson<TsConfigJson>(basePath);

  // if (!base) {
  //   basePath = require.resolve(tsConfig.extends);
  //   base = await getJson<TsConfigJson>(basePath);
  // }

  return base ? ({base, basePath} as const) : undefined;
};
