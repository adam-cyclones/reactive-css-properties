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
}

export interface ICSSPropCallbackChangeDetail {
  value: StringCastable;
  oldValue: Nullable<StringCastable>;
}

export interface ICSSPropEntry {
  readonly key: string;
  readonly value: StringCastable;
  readonly subscribe: (
    cb: (change: ICSSPropCallbackChangeDetail) => void
  ) => void;
}
