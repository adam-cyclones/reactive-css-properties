import rxDom from "rx-dom";
import { camelToSnakeCase } from "./utils/camelToSnakeCase";
import { callable } from "./utils/Callable";
const fromMutationObserver = rxDom.DOM.fromMutationObserver;
/**
 * Set css variables and react to changes
 * */
export default (rootEl = document.documentElement) => {
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
            const key = `--${camelToSnakeCase(prop)}`;
            let fallback = '';
            // always return a Callable
            // @ts-ignore
            target[prop] = callable({
                function(value, fallbackValue) {
                    fallback = fallbackValue;
                    previousValues[key] = {
                        value,
                        oldValue: previousValues[key] ? previousValues[key].value : null
                    };
                    // set CSS variable value to DOM
                    if (fallbackValue) {
                        rootEl.style.setProperty(key, `${value}`);
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
                valueOf() {
                    return `var(${key}, ${fallback})`;
                }
            });
            return Reflect.get(target, prop, receiver);
        }
    });
};
