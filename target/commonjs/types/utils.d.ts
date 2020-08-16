export declare type Nullable<T> = T | null;
export declare type StringCastable = string | number | boolean;
interface ICallable<argsT extends any[], returnT> {
    function(...args: argsT): returnT;
}
export declare type Callable<membersI, argsT extends any[], returnT> = membersI & ICallable<argsT, returnT>;
export interface IHasValueOf<T> {
    valueOf(): T;
}
export {};
