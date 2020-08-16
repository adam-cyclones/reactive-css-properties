/**
 * Create an object - function like datastructure which can be called and also hold keys and values
 */
export const callable = (body) => {
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
