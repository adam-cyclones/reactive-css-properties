"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.callable = void 0;
/**
 * Create an object - function like datastructure which can be called and also hold keys and values
 */
exports.callable = (body) => {
    const instance = Object.create(body);
    return new Proxy(Function, {
        apply(target, thisArg, argumentsList) {
            return Reflect.apply(instance.function, instance, argumentsList);
        },
        get(tar, prop, reciever) {
            return Reflect.get(instance, prop, reciever);
        }
    });
};
