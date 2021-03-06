import { isObject } from "../shared";
import { track, trigger } from "./effect";
import { reactive, ReactiveFlags, readonly } from "./reactive";

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
const readonlySet = createReadonlySetter();

function createGetter(isReadonly = false, isShallowReadonly = false) {
  return function get(target, key) {
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    } else if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    }

    let res = Reflect.get(target, key);

    if (isShallowReadonly) {
      return res;
    }

    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }

    // 依赖收集
    if (!isReadonly) {
      track(target, key);
    }
    return res;
  };
}

function createSetter() {
  return function set(target, key, value) {
    const res = Reflect.set(target, key, value);
    // 触发
    trigger(target, key);
    return res;
  };
}

function createReadonlySetter() {
  return function set(target, key, value) {
    console.warn(`key cannot be set, because target is readonly`);
    return true;
  };
}

export const mutableHandler = {
  get,
  set,
};

export const readonlyHandler = {
  get: readonlyGet,
  set: readonlySet,
};

export const shallowReadonlyHandler = {
  get: shallowReadonlyGet,
  set: readonlySet,
};
