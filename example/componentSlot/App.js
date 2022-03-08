import { createTextVNode, h } from "../../lib/mini-vue.esm.js";
import { Foo } from "./Foo.js";

export const App = {
  render() {
    const app = h("div", {}, "App");
    // 单个
    // const foo = h(Foo, {}, h("p", {}, "123"));
    //数组
    // const foo = h(Foo, {}, [h("p", {}, "123"), h("p", {}, "456")]);
    // 对象
    // const foo = h(
    //   Foo,
    //   {},
    //   { header: h("p", {}, "header"), footer: h("p", {}, "footer") }
    // );
    const foo = h(
      Foo,
      {},
      {
        header: ({ age }) => [
          h("p", {}, "header" + age),
          createTextVNode("你好"),
        ],
        footer: () => h("p", {}, "footer"),
      }
    );
    return h("div", {}, [app, foo]);
  },
  setup() {
    return {};
  },
};
