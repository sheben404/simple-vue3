import { mutableHandler, readonlyHandler } from "./basehandlers";

export function reactive(raw) {
  return createActiveObject(raw, mutableHandler);
}

export function readonly(raw) {
  return createActiveObject(raw, readonlyHandler);
}

function createActiveObject(raw, basehandler) {
  return new Proxy(raw, basehandler);
}
