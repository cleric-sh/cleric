import {Compute} from 'Any/_api';
import {L, U} from 'ts-toolbelt';
import {Directory} from './directory/Directory';
import {File} from './file/File';

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
