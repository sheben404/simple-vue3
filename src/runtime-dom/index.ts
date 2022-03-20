import { createRenderer } from "../runtime-core";
import { getEventName, isOnEvent } from "../shared";

export function createElement(type) {
  return document.createElement(type);
}

export function patchProp(el, key, prevVal, nextVal) {
  if (isOnEvent(key)) {
    el.addEventListener(getEventName(key), nextVal);
  } else {
    if (nextVal == null) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, nextVal);
    }
  }
}

export function insert(el, container) {
  container.append(el);
}

export function remove(child) {
  const parent = child.parentNode
  if (parent) {
    parent.removeChild(child)
  }
}

export function setElementText(el, text) {
  el.textContent = text
}

const render: any = createRenderer({
  createElement,
  patchProp,
  insert,
  remove,
  setElementText
});

export function createApp(...args) {
  return render.createApp(...args);
}

export * from "../runtime-core";
