import {shared} from '../shared';

/**
 * Other libs see this package as '@cleric/a', so when we augment a module
 * with a relative path, the '../' augmentation doesn't match anything.
 *
 * Hence this augmentation is private, for this module only.
 */
declare module '../shared' {
  export interface Shared {
    relative: 'RELATIVE';
  }
}

shared.relative = 'RELATIVE';
