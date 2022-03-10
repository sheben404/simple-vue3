import { proxyRefs } from "../reactivity";
import { shallowReadonly } from "../reactivity/reactive";
import { emit } from "./componentEmit";
import { initProps } from "./componentProps";
import { PublicInstanceProxyHandles } from "./componentPublicInstance";
import { initSlots } from "./componentSlots";

export function createComponentInstance(vnode, parent) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    props: {},
    slots: {},
    provides: parent ? parent.provides : {},
    parent,
    isMounted: false,
    subTreee: {},
    emit: () => {},
  };
  component.emit = emit.bind(null, component) as any;
  return component;
}

export function setupComponent(instance) {
  initProps(instance, instance.vnode.props);
  initSlots(instance, instance.vnode.children);

  setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
  const Component = instance.type;

  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandles);

  const { setup } = Component;
  if (setup) {
    setCurrentInstance(instance);
    // function or object
    const setupResult = setup(shallowReadonly(instance.props), {
      emit: instance.emit,
    });

    setCurrentInstance(null);

    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult(instance, setupResult) {
  if (typeof setupResult === "object") {
    instance.setupState = proxyRefs(setupResult);
  }

  finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
  const Component = instance.type;
  instance.render = Component.render;
}

let currentInstance = null;

export function getCurrentInstance() {
  return currentInstance;
}

// 抽离出函数，有助于我们后续想要跟踪 currentInstance 时
// 只需要在 setCurrentInstance 这个函数中打断点
// 然后调试即可
export function setCurrentInstance(instance) {
  currentInstance = instance;
}
