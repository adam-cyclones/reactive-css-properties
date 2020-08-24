import { callable } from "../src/utils/Callable";
import { camelToSnakeCase } from "../src/utils/camelToSnakeCase";

describe("utilities", () => {
  it("should convert camelCase to snake case", () => {
    expect(camelToSnakeCase("helloWorld")).toBe("hello-world");
  });

  it("should create class-like callable instnace with methods, properties and is also callable in iteself.", () => {
    const myCallable = callable({
      function(arg) {
        return "I was called " + arg;
      },
      someProperty: "have some value",
      someMethod() {
        return "I am a method and I return some value";
      }
    });

    expect(myCallable("with arg")).toEqual("I was called with arg");
    expect(myCallable.someMethod()).toEqual(
      "I am a method and I return some value"
    );
    expect(myCallable.someProperty).toBe("have some value");
  });
});
