import {shared} from '@sanity/a/shared';

declare module '@sanity/a/shared' {
  export interface Shared {
    b: 'B';
  }
}

shared.b = 'B';
