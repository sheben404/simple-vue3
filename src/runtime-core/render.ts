import { isObject } from "../shared/index";
import { createComponentInstance, setupComponent } from "./component";
import { createVNode } from "./vnode";

export function render(vnode, container) {
  patch(vnode, container);
}
function patch(vnode, container) {
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    // 处理组件
    processComponent(vnode, container);
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container);
}

function mountElement(vnode, container) {
  const { type, props, children } = vnode;
  const el = (vnode.el = document.createElement(type));
  for (const key in props) {
    const val = props[key];
    el.setAttribute(key, val);
  }
  if (typeof children === "string") {
    el.textContent = children;
  } else if (Array.isArray(children)) {
    mountChildren(children, el);
  }
  container.append(el);
}

function mountChildren(children, container) {
  children.forEach((item) => {
    patch(item, container);
  });
}

function processComponent(vnode, container) {
  mountComponent(vnode, container);
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode);

  setupComponent(instance);
  setupRenderEffect(instance, vnode, container);
}
function setupRenderEffect(instance, vnode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  // vnode => patch
  // vnode => element -> mountElement
  patch(subTree, container);
  vnode.el = subTree.el;
}
