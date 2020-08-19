"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rx_dom_1 = __importDefault(require("rx-dom"));
const camelToSnakeCase_1 = require("./utils/camelToSnakeCase");
const Callable_1 = require("./utils/Callable");
const fromMutationObserver = rx_dom_1.default.DOM.fromMutationObserver;
/**
 * Set css variables and react to changes
 * */
exports.default = (rootEl = document.documentElement, scope) => {
    /**
     * Tracks previous values against current values
     * */
    const previousValues = {};
    /**
     * used to return a magic object, an object where every got key returns a css variable factory function
     */
    const magicGetterFactory = Object.create(null);
    return new Proxy(magicGetterFactory, {
        get(target, prop, receiver) {
            const key = `--${scope ? `${scope}-` : ''}${camelToSnakeCase_1.camelToSnakeCase(prop)}`;
            // always return a Callable
            // @ts-ignore
            const valueSym = Symbol('value');
            const fallbackSym = Symbol('fallback');
            const nullValue = 'unset';
            // observe rootEl for style changes
            const rootStyleOvserver = fromMutationObserver(rootEl, {
                attributes: true,
                attributeFilter: ["style"],
                attributeOldValue: false,
                childList: false,
                subtree: false
            });
            // values can exist from stylesheets and so to overload them we need to retrieve them
            let preExistingValue = window.getComputedStyle(rootEl).getPropertyValue(key);
            if (preExistingValue) {
                preExistingValue = preExistingValue.trim();
            }
            previousValues[key] = {
                value: preExistingValue || nullValue,
                oldValue: previousValues[key] ? previousValues[key].value.toString().trim() : preExistingValue || nullValue
            };
            // @ts-ignore
            target[prop] = Callable_1.callable({
                function(value, fallbackValue) {
                    value = value.toString().trim();
                    // @ts-ignore
                    this[valueSym] = value || preExistingValue;
                    // @ts-ignore
                    this[fallbackSym] = fallbackValue;
                    previousValues[key] = {
                        value,
                        oldValue: previousValues[key] ? previousValues[key].value : preExistingValue || "initial"
                    };
                    rootEl.style.setProperty(key, value.toString());
                },
                subscribe(cb) {
                    rootStyleOvserver.subscribe((change) => {
                        // @ts-ignore
                        const { oldValue } = previousValues[key];
                        const newValue = window
                            .getComputedStyle(rootEl)
                            .getPropertyValue(key);
                        if (oldValue !== newValue && change.length) {
                            cb({
                                value: newValue.trim(),
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
                    return this[valueSym] || preExistingValue || nullValue;
                },
                getFallbackValue() {
                    // @ts-ignore
                    return this[fallbackSym] || nullValue;
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
