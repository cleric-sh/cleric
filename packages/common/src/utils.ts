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
