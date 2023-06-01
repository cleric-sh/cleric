import {splitCamelCase} from './splitCamelCase';

export const formatEnvKey = (key: string) => {
  const tokens = splitCamelCase(key);
  if (!tokens) throw Error(`String '${key}' can't be formatted as a valid Env key.`);
  return tokens.join('_').toUpperCase();
};
