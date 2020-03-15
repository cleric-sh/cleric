import * as Types from './types';
export { Types };

/**
 * Dummy dependency for sanity checks to make sure deps are wired up
 * and HMR works.
 */
const Hello = 'Hello World!';
export { Hello };

export abstract class TypeError<TMsg extends string> {}
