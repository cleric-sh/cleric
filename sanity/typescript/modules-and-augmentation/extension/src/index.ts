import {shared} from '@sanity/core/src/shared';

declare module '@sanity/core/src/shared' {
  export interface Shared {
    extension: 'EXTENSION';
  }
}

shared.extension = 'EXTENSION';
