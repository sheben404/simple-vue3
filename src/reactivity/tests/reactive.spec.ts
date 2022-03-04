import { isReactive, reactive } from "../reactive";
describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(isReactive(original)).toBe(false);
    expect(isReactive(observed)).toBe(true);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
  });

  it("happy path", () => {
    const original = { foo: 1, array: [{ bar: 2 }], nested: { three: 3 } };
    const observed = reactive(original);
    expect(isReactive(observed)).toBe(true);
    expect(isReactive(observed.array)).toBe(true);
    expect(isReactive(observed.array[0])).toBe(true);
    expect(isReactive(observed.nested)).toBe(true);
  });
});
