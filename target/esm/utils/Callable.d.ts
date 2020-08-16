import { Callable } from "../types/utils";
/**
 * Create an object - function like datastructure which can be called and also hold keys and values
 */
export declare const callable: <memberI, argsT extends any[], returnT>(body: Callable<memberI, argsT, returnT>) => FunctionConstructor;
