import { mutableHandler, readonlyHandler } from "./basehandlers";

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHandler);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandler);
}

function createActiveObject(raw, basehandler) {
  return new Proxy(raw, basehandler);
}

export function isReadonly(raw) {
  return !!raw[ReactiveFlags.IS_READONLY];
}

export function isActive(raw) {
  return !!raw[ReactiveFlags.IS_REACTIVE];
}
