/**
 * "Go up to find '@cleric/a' in the parent node_modules and load the 'shared' module
 * underneath it."
 *
 * In this setup, this will find the symlink in the monorepo's root to the 'a' package.
 * This is semantically the same as referencing '../shared'.
 *
 * If we delete 'node_modules' or set this up in a single repository, this
 * form of referencing won't work.
 *
 * The @cleric/a package itself doesn't know anything about a module called
 * '@cleric/a'. However, typescript will allow us to reference it here because
 * of the monorepo setup. Typescript/node will search up the hierarchy until
 * it finds the root node_modules, where '@cleric/a' is symlinked by yarn as
 * a workspace.
 */
import {shared} from '@sanity/a/shared';

/**
 * Module augmentation needs to match something that's imported, otherwise
 * it is augmenting the 'global' context.
 *
 * If we were to import something into a global context, we would be declaring a
 * 'new' module with the same name, and it would overwrite the existing '@cleric/a',
 * rather than augmenting it.
 */
declare module '@sanity/a/shared' {
  export interface Shared {
    extraneous: 'EXTRANEOUS';
  }
}

shared.extraneous = 'EXTRANEOUS';
