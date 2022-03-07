import { PublicInstanceProxyHandles } from "./componentPublicInstance";

export function createComponentInstance(vnode) {
  const component = {
    vnode,
    type: vnode.type,
    setupState: {},
    el: null,
  };
  return component;
}

export function setupComponent(instance) {
  // initProps()
  // initSlots()

  setupStatefulComponent(instance);
}
function setupStatefulComponent(instance) {
  const Component = instance.type;

  // ctx
  instance.proxy = new Proxy({ _: instance }, PublicInstanceProxyHandles);

  const { setup } = Component;
  if (setup) {
    // function or object
    const setupResult = setup();

    handleSetupResult(instance, setupResult);
  }
}
function handleSetupResult(instance, setupResult) {
  if (typeof setupResult === "object") {
    instance.setupState = setupResult;
  }

  finishComponentSetup(instance);
}
function finishComponentSetup(instance) {
  const Component = instance.type;
  instance.render = Component.render;
}
