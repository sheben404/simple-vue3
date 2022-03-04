import { effect, stop } from "../effect";
import { reactive } from "../reactive";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });
    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });
    expect(nextAge).toBe(11);

    // update
    user.age++;
    expect(nextAge).toBe(12);
  });

  it("should return runner when call effect", () => {
    let foo = 10;
    const runner = effect(() => {
      foo++;
      return "foo";
    });
    expect(foo).toBe(11);
    const res = runner();
    expect(foo).toBe(12);
    expect(res).toBe("foo");
  });

  it("scheduler", () => {
    // 1. effect 的第二个参数为包含一个 scheduler 函数的 option
    // 2. 当 effect 第一次执行的时候，会执行 effect 的第一个参数（fn）
    // 3. 当响应式对象 set update 时，不会再执行 fn，而是执行 scheduler
    // 4. 如果执行 effect 返回的 runner 时，会再次执行 fn
    let dummy;
    let run;
    let scheduler = jest.fn(() => {
      run = runner;
    });
    const obj = reactive({ foo: 1 });
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      { scheduler }
    );
    expect(scheduler).not.toHaveBeenCalled();
    expect(dummy).toBe(1);
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(1);
    expect(dummy).toBe(1);
    obj.foo++;
    expect(scheduler).toHaveBeenCalledTimes(2);
    expect(dummy).toBe(1);
    run();
    expect(dummy).toBe(3);
  });

  it("stop", () => {
    let dummy;
    const obj = reactive({ prop: 1 });
    const runner = effect(() => {
      dummy = obj.prop;
    });
    obj.prop = 2;
    expect(dummy).toBe(2);
    stop(runner);
    // obj.prop = 3; // 只涉及 set 操作
    obj.prop++; // 还涉及 get 操作
    expect(dummy).toBe(2);

    // 手动执行 runner
    runner();
    expect(dummy).toBe(3);

    obj.prop = 4;
    expect(dummy).toBe(3);

    // stop(runner);
    obj.prop = 5;
    expect(dummy).toBe(3);
  });

  it("onStop", () => {
    const obj = reactive({
      foo: 1,
    });
    const onStop = jest.fn();
    let dummy;
    const runner = effect(
      () => {
        dummy = obj.foo;
      },
      {
        onStop,
      }
    );
    stop(runner);
    expect(onStop).toBeCalledTimes(1);
  });
});
