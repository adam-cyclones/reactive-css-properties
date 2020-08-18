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
            const key = `--${scope ? `${scope}-` : ''}${camelToSnakeCase_1.camelToSnakeCase(prop)}`;
            // always return a Callable
            // @ts-ignore
            target[prop] = Callable_1.callable({
                function(value, fallbackValue) {
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
                valueOf() {
                    return `var(${key})`;
                }
            });
            return Reflect.get(target, prop, receiver);
        }
    });
};
