import { isObject } from "../shared/index";
import {
  mutableHandler,
  readonlyHandler,
  shallowReadonlyHandler,
} from "./baseHandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function reactive(raw) {
  return createReactiveObject(raw, mutableHandler);
}

export function readonly(raw) {
  return createReactiveObject(raw, readonlyHandler);
}

export function shallowReadonly(raw) {
  return createReactiveObject(raw, shallowReadonlyHandler);
}

function createReactiveObject(raw, basehandler) {
  if (!isObject(raw)) {
    console.warn(`target ${raw} is not an object`);
    return;
  }
  return new Proxy(raw, basehandler);
}

export function isReadonly(raw) {
  return !!raw[ReactiveFlags.IS_READONLY];
}

export function isReactive(raw) {
  return !!raw[ReactiveFlags.IS_REACTIVE];
}

export function isProxy(raw) {
  return isReactive(raw) || isReadonly(raw);
}
