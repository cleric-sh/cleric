import {shared} from '@sanity/core/shared';

declare module '@sanity/core/shared' {
  export interface Shared {
    extension: 'EXTENSION';
  }
}

shared.extension = 'EXTENSION';
