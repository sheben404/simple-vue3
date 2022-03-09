import { getEventName, isOnEvent } from "../shared/index";
import { ShapeFlags } from "../shared/ShapeFlags";
import { createComponentInstance, setupComponent } from "./component";
import { Fragment, Text } from "./vnode";

export function render(vnode, container) {
  patch(vnode, container, null);
}
function patch(vnode, container, parentComponent) {
  const { type, shapeFlag } = vnode;
  switch (type) {
    case Fragment:
      processFragment(vnode, container, parentComponent);
      break;
    case Text:
      processText(vnode, container);
      break;
    default:
      if (shapeFlag & ShapeFlags.ELEMENT) {
        processElement(vnode, container, parentComponent);
      } else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
        // 处理组件
        processComponent(vnode, container, parentComponent);
      }
      break;
  }
}

function processFragment(vnode, container, parentComponent) {
  mountChildren(vnode, container, parentComponent);
}
function processText(vnode, container) {
  const { children } = vnode;
  const textNode = (vnode.el = document.createTextNode(children));
  container.append(textNode);
}

function processElement(vnode, container, parentComponent) {
  mountElement(vnode, container, parentComponent);
}

function mountElement(vnode, container, parentComponent) {
  const { type, props, children, shapeFlag } = vnode;
  const el = (vnode.el = document.createElement(type));
  for (const key in props) {
    const val = props[key];
    if (isOnEvent(key)) {
      el.addEventListener(getEventName(key), val);
    } else {
      el.setAttribute(key, val);
    }
  }
  if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
    el.textContent = children;
  } else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
    mountChildren(vnode, el, parentComponent);
  }
  container.append(el);
}

function mountChildren(vnode, container, parentComponent) {
  vnode.children.forEach((item) => {
    patch(item, container, parentComponent);
  });
}

function processComponent(vnode, container, parentComponent) {
  mountComponent(vnode, container, parentComponent);
}

function mountComponent(initialVNode, container, parentComponent) {
  const instance = createComponentInstance(initialVNode, parentComponent);

  setupComponent(instance);
  setupRenderEffect(instance, initialVNode, container);
}
function setupRenderEffect(instance, initialVNode, container) {
  const { proxy } = instance;
  const subTree = instance.render.call(proxy);
  // vnode => patch
  // vnode => element -> mountElement
  patch(subTree, container, instance);
  initialVNode.el = subTree.el;
}
