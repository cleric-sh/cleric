/**
 * Defines the union of all Types of all the keys of T.
 */
export type TypesOfKeys<T> = T extends { [P in keyof T]: infer U } ? U : never;

/**
 * Defines the union of all keys of T that extend Type.
 */
export type KeysOfType<T, Type> = {
  [P in keyof T]: T[P] extends Type ? P : never;
}[keyof T];
export type KeysNotOfType<T, Type> = {
  [P in keyof T]: T[P] extends Type ? never : P;
}[keyof T];

/**
 * Defines the union of all keys of T that are an Array.
 */
export type KeysOfArrays<T> = {
  [Ref in keyof T]: T[Ref] extends Array<infer _> ? Ref : never;
}[keyof T];

export type FilterInclude<T, Type> = Pick<T, KeysOfType<T, Type>>;
export type FilterExclude<T, Type> = Pick<T, KeysNotOfType<T, Type>>;

// export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
export declare type DeepPartial<T> = T extends Function
  ? T
  : T extends Array<infer U>
  ? DeepPartialArray<U>
  : T extends object
  ? DeepPartialObject<T>
  : T | undefined;
export interface DeepPartialArray<T> extends Array<DeepPartial<T>> {}
/** @private */
export declare type DeepPartialObject<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
const test = {
  one: 1,
  two: 'two',
  three: [1],
  four: {
    five: true,
  },
};

const partIn: (part: DeepPartial<typeof test>) => {} = part => {};

partIn({
  three: [3],
  foo: '',
});

const partOut: () => DeepPartial<typeof test> = () => ({
  three: [3],
  foo: '',
});
