import { render } from "./render";
import { createVNode } from "./vnode";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // vue3 中把 component 转换为 vnode
      // 之后所有的操作都是基于 vnode 来进行
      const vnode = createVNode(rootComponent);

      render(vnode, rootContainer);
    },
  };
}
