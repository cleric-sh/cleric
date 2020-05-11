import {Compute} from 'Any/_api';
import {L, U} from 'ts-toolbelt';
import {File} from '../file/File';
import {Directory} from './Directory';

export type ExportsOf<TNodes extends Array<Directory | File>> = Compute<
  U.IntersectOf<
    L.UnionOf<
      {
        [K in keyof TNodes]: TNodes[K] extends Directory<infer Exports>
          ? Exports
          : TNodes[K] extends File<infer Exports>
          ? Exports
          : {};
      }
    >
  >
>;
