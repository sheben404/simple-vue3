import { h } from "../../lib/mini-vue.esm.js";

export const App = {
  render() {
    // ui
    return h(
      "div",
      {
        id: "root",
        class: ["red", "soft"],
      },
      // "hi, " + this.msg
      // string
      // "hi, mini-vue！"
      // array
      [h("p", { class: "red" }, "hi"), h("p", { class: "blue" }, "mini-vue")]
    );
  },
  setup() {
    return {
      msg: "mini-vue",
    };
  },
};
