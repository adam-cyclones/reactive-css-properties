import rxDom from "rx-dom";
import { camelToSnakeCase } from "./utils/camelToSnakeCase";
import { callable } from "./utils/Callable";
import { StringCastable, IHasValueOf } from "./types/utils";
import {
  ICSSPropCallbackChangeDetail,
  CSSPropEntity,
  ICSSPropCallable
} from "./types/reactiveCSS";

const fromMutationObserver = rxDom.DOM.fromMutationObserver;

/**
 * Set css variables and react to changes
 * */
export default (
  rootEl: HTMLElement = document.documentElement,
  scope?: string
): { [k: string]: CSSPropEntity } => {
  /**
   * Tracks previous values against current values
   * */
  const previousValues: { [key: string]: ICSSPropCallbackChangeDetail } = {};
  // observe rootEl for style changes
  const rootStyleOvserver = fromMutationObserver(rootEl, {
    attributes: true,
    attributeFilter: ["style"],
    attributeOldValue: false,
    childList: false,
    subtree: false
  });

  /**
   * used to return a magic object, an object where every got key returns a css variable factory function
   */
  const magicGetterFactory = Object.create(null);
  return new Proxy(magicGetterFactory, {
    get(target: { [key: string]: CSSPropEntity }, prop: string, receiver) {
      const key = `--${scope ? `${scope}-` : ''}${camelToSnakeCase(prop)}`;
      // always return a Callable
      // @ts-ignore
      const valueSym = Symbol('value');
      const fallbackSym = Symbol('fallback');
      // @ts-ignore
      target[prop] = callable<
        ICSSPropCallable & IHasValueOf<string>,
        Array<StringCastable>,
        void
      >({
        function(value: StringCastable, fallbackValue?: StringCastable): void {
          // @ts-ignore
          this[valueSym] = fallbackValue;
          // @ts-ignore
          this[fallbackSym] = value;
          previousValues[key] = {
            value,
            oldValue: previousValues[key] ? previousValues[key].value : null
          };
          // set CSS variable value to DOM
          if (fallbackValue !== null || fallbackValue) {
            rootEl.style.setProperty(key, `${value}, ${fallbackValue}`);
          } else {
            rootEl.style.setProperty(key, value.toString());
          }
        },
        subscribe(cb: (change: ICSSPropCallbackChangeDetail) => void): void {
          rootStyleOvserver.subscribe((change) => {
            // @ts-ignore
            const mutation = change[0];
            const { oldValue } = previousValues[key];
            const newValue = window
              .getComputedStyle(mutation.target)
              .getPropertyValue(key);
            if (oldValue !== newValue) {
              cb({
                value: newValue,
                oldValue: oldValue
              });
            }
          });
        },
        getUsage(): string {
          return `var(${key}, ${this.getFallbackValue()})`
        },
        getKey(): string {
          return key;
        },
        getValue() {
          // @ts-ignore
          return this[valueSym];
        },
        getFallbackValue() {
          // @ts-ignore
          return this[fallbackSym] || '';
        },
        getScope(): string {
          return scope || '';
        },
        valueOf(): string {
          return this.getUsage();
        }
      });
      return Reflect.get(target, prop, receiver);
    }
  });
};
