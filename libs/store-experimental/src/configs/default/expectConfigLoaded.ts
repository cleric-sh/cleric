import {getConfig} from '../../config';

export const expectConfigLoaded = () => {
  const config = getConfig('Default');
  for (const api of config.apis) {
    expect(api).not.toBe(undefined);
  }
};
