import { createRenderer } from "../runtime-core";
import { getEventName, isOnEvent } from "../shared";

export function createElement(type) {
  return document.createElement(type);
}

export function patchProp(el, key, val) {
  if (isOnEvent(key)) {
    el.addEventListener(getEventName(key), val);
  } else {
    el.setAttribute(key, val);
  }
}

export function insert(el, container) {
  container.append(el);
}

const render: any = createRenderer({
  createElement,
  patchProp,
  insert,
});

export function createApp(...args) {
  return render.createApp(...args);
}

export * from "../runtime-core";
