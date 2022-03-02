import { isReadonly, readonly } from "../reactive";

describe("readonly", () => {
  it("happy path", () => {
    const original = { foo: 1, bar: { bar: 2 } };
    const wrapped = readonly(original);
    expect(isReadonly(original)).toBe(false);
    expect(isReadonly(wrapped)).toBe(true);
    expect(wrapped).not.toBe(original);
    expect(wrapped.foo).toBe(1);
  });

  it("wran when be set", () => {
    console.warn = jest.fn();

    const user = readonly({
      age: 10,
    });

    user.age = 11;

    expect(console.warn).toBeCalled();
  });
});
