import { isActive, reactive } from "../reactive";
describe("reactive", () => {
  it("happy path", () => {
    const original = { foo: 1 };
    const observed = reactive(original);
    expect(isActive(original)).toBe(false);
    expect(isActive(observed)).toBe(true);
    expect(observed).not.toBe(original);
    expect(observed.foo).toBe(1);
  });
});
