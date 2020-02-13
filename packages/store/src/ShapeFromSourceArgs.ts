import { SourceArgs, Source } from './store';
/**
 * Given a Sources type, returns the Shape of the value of the
 * Observable that would be produced if all Sources were
 * combined and reduced to the root type. E.g.
 * {
 *  one: Observable<string>;
 *  two: [1,2,3];
 *  three: Observable<{ four: boolean }> | {
 *    four: Promise<boolean>
 *  }
 * }
 * Becomes:
 * {
 *  one: string;
 *  two: number;
 *  three: {
 *    four: boolean;
 *  }
 * }
 */
export type ShapeFromSourceArgs<TSources extends SourceArgs> = TSources extends Source<infer U>
  ? U
  : {
      [P in keyof TSources]: TSources[P] extends Source<infer V>
        ? V
        : TSources[P] extends SourceArgs
        ? ShapeFromSourceArgs<TSources[P]>
        : never;
    };
