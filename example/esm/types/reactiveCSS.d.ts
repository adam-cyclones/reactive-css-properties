import { Nullable, StringCastable } from "./utils";
/**
 * @param {StringCastable} cssValue - A css safe value
 * @param {StringCastable} fallbackValue - A css safe value to be used when css custom properties are not supported
 * @method subscribe - Reactively watch for changes to css variables in real time, including from devtools or stylesheets
 */
export interface CSSPropEntity {
    (cssValue: StringCastable, fallbackValue?: StringCastable): ICSSPropEntry;
    subscribe(cb: (change: ICSSPropCallbackChangeDetail) => void): void;
}
export interface ICSSPropCallable {
    subscribe: CSSPropEntity["subscribe"];
    /**
     * @description The key of the variable
     * */
    getKey(): string;
    /**
     * @description The value of the variable as of now but this might change and is not reactive
     * */
    getValue(): string;
    /**
     * @description The fallback of the variable as of now but this might change and is not reactive
   * */
    getFallbackValue(): string;
    /**
     * @description full css var() as it would be used
     * */
    getUsage(): string;
    /**
     * @description The scope of the variable if provided
     * @returns scope string or empty string if none provided
     * */
    getScope(): string;
    /**
     * @description The Symbol fallback value if the browser doesnt support css vars
     * */
    fallback?: string;
    /**
     * @description The Symbol  value if the browser doesnt support css vars
     * */
    value?: string;
}
export interface ICSSPropCallbackChangeDetail {
    value: StringCastable;
    oldValue: Nullable<StringCastable>;
}
export interface ICSSPropEntry {
    readonly key: string;
    readonly value: StringCastable;
    readonly subscribe: (cb: (change: ICSSPropCallbackChangeDetail) => void) => void;
}
