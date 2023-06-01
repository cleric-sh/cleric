import {configure} from './configuration/configure';
import {DefaultConfig, DefaultConfigArgs} from './default';

export const getConfig = configure(DefaultConfig, DefaultConfigArgs);
export default getConfig;
