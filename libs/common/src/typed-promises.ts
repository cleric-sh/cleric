import {isPromise} from './guards';

const PROMISE_TYPE = Symbol('PROMISE_TYPE');

type TypedPromise<TTypeName, T> = T & {
  [PROMISE_TYPE]: TTypeName;
};

export const asTypedPromise = <
  TTypeName extends string,
  TPromise extends Promise<unknown>
>(
  typeName: TTypeName,
  promise: TPromise
) => {
  promise[PROMISE_TYPE] = typeName;
  return promise as TypedPromise<TTypeName, TPromise>;
};

export const isTypedPromise = <TTypeName extends string>(
  value: unknown,
  typeName: TTypeName
): value is TypedPromise<TTypeName, unknown> => {
  return isPromise(value) && value[PROMISE_TYPE] === typeName;
};

export const asTypedAsyncFn = <
  TTypeName extends string,
  TArgs extends unknown[],
  TPromise extends Promise<unknown>
>(
  typeName: TTypeName,
  asyncFn: (...args: TArgs) => TPromise
) => (...args: TArgs) => asTypedPromise(typeName, asyncFn(...args));
