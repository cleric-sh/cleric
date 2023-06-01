import {Tuple} from "ts-toolbelt";
import {Clean} from "Any/_api";
import {Compute} from "Any/Compute";
import {UnionOf} from "List/UnionOf";
import {Replace} from "List/Replace";

describe('that is a mapped type', () => {

    describe('normally', () => {

        /**
         * Because mapped types are inferred as objects.
         * This prevents a mapped tuple type from being able to be spread.
         *
         * See also: https://github.com/microsoft/TypeScript/issues/42435
         */
        it(`isn't accepted as an Array and so we can't spread the args`, () => {

            type Ctor = { new(...args: any[]): Object};
            type CtorParams<TSourceClass extends Ctor> = TSourceClass extends { new(...args: infer U): Object} ? U : never;

            type MaybeLazy<T> = T | (() => T);

            type Lazy<Tuple extends [...any[]]> = {
                [I in keyof Tuple]: MaybeLazy<Tuple[I]>;
            }

            function use<TCtor extends Ctor>(
                ctor: TCtor,
                // ...args: Lazy<CtorParams<TCtor>>
            ) {}
        })

        it(`can be coerced to be accepted as an Array`, () => {

            type Ctor = { new(...args: any[]): Object};
            type CtorParams<TSourceClass extends Ctor> = TSourceClass extends { new(...args: infer U): Object} ? U : any[];

            type MaybeLazy<T> = T | (() => T);

            type Lazy<Tuple extends [...any[]]> = {
                [I in keyof Tuple]: MaybeLazy<Tuple[I]>;
            }

            type AsArray<T> = T extends unknown[] ? T : never;

            function use<TCtor extends Ctor>(
                ctor: TCtor,
                ...args: AsArray<Lazy<CtorParams<TCtor>>>
            ) {}

            type First<T extends [...[unknown, unknown][]]> = {
                [P in keyof T]: T[P] extends [infer K, unknown] ? K : never;
            } extends Array<infer U> ? U : never

            function set<T extends [...[T1, unknown][]], T1 extends string>(
                args: T
            ) {
                return args.map(a => a[0]) as unknown as First<T>;
            }

            const foo = set([['a', 'b'], ['c', 'd']])


            // type X = Tuple.Extract
        })
    })
})
