import rxDom from "rx-dom";
import { camelToSnakeCase } from "./utils/camelToSnakeCase";
import { callable } from "./utils/Callable";
const fromMutationObserver = rxDom.DOM.fromMutationObserver;
/**
 * Set css variables and react to changes
 * */
export default (rootEl = document.documentElement, scope) => {
    /**
     * Tracks previous values against current values
     * */
    const previousValues = {};
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
        get(target, prop, receiver) {
            const key = `--${scope ? `${scope}-` : ''}${camelToSnakeCase(prop)}`;
            // always return a Callable
            // @ts-ignore
            const valueSym = Symbol('value');
            const fallbackSym = Symbol('fallback');
            // @ts-ignore
            target[prop] = callable({
                function(value, fallbackValue) {
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
                    }
                    else {
                        rootEl.style.setProperty(key, value.toString());
                    }
                },
                subscribe(cb) {
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
                getUsage() {
                    return `var(${key}, ${this.getFallbackValue()})`;
                },
                getKey() {
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
                getScope() {
                    return scope || '';
                },
                valueOf() {
                    return this.getUsage();
                }
            });
            return Reflect.get(target, prop, receiver);
        }
    });
};
