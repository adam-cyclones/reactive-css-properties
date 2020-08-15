export type Nullable<T> = T | null;

export type StringCastable = string | number | boolean;

interface ICallable<argsT extends any[], returnT> {
  function(...args: argsT): returnT;
}

export type Callable<membersI, argsT extends any[], returnT> = membersI &
  ICallable<argsT, returnT>;

export interface IHasValueOf<T> {
  valueOf(): T;
}
