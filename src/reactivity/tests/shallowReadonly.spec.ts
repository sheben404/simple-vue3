import { isProxy, isReadonly, shallowReadonly } from "../reactive";

describe("shallowReadonly", () => {
  it("nested readonly", () => {
    const original = { foo: 1, bar: { bar: 2 } };
    const wrapped = shallowReadonly(original);
    expect(isReadonly(wrapped)).toBe(true);
    expect(isReadonly(wrapped.bar)).toBe(false);
    expect(isProxy(wrapped)).toBe(true);
  });

  it("wran when be set", () => {
    console.warn = jest.fn();

    const original = { foo: 1, bar: { bar: 2 } };
    const wrapped = shallowReadonly(original);

    wrapped.foo = 11;

    expect(console.warn).toBeCalled();

    wrapped.bar.bar = 3;

    expect(wrapped.bar.bar).toBe(3);
  });
});
