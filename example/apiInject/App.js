import { h, provide, inject } from "../../lib/mini-vue.esm.js";

const Provider = {
  name: "Provider",
  setup() {
    provide("foo", "fooVal");
    provide("bar", "barVal");
  },
  render() {
    return h("div", {}, [h("p", {}, "Provider"), h(ProviderTwo)]);
  },
};

const ProviderTwo = {
  name: "ProviderTwo",
  setup() {
    provide("foo", "fooTwoVal");
    provide("foo2", "fooVal2");
    provide("bar2", "barVal2");
    const injectFoo = inject("foo");
    return { injectFoo };
  },
  render() {
    return h("div", {}, [
      h("p", {}, `ProviderTwo: this.injectFoo = ${this.injectFoo}`),
      h(Consumer),
    ]);
  },
};

const Consumer = {
  name: "Consumer",
  setup() {
    const foo = inject("foo");
    const bar = inject("bar");
    const foo2 = inject("foo2");
    const bar2 = inject("bar2");
    // const bar3 = inject("bar3", "bar3DefaultValue");
    const bar3 = inject("bar3", () => "bar3DefaultValue");
    return { foo, bar, foo2, bar2, bar3 };
  },
  render() {
    return h(
      "div",
      {},
      `Cousumer: ${this.foo} - ${this.bar} - ${this.foo2} - ${this.bar2} - ${this.bar3} `
    );
  },
};

export const App = {
  name: "App",
  setup() {},
  render() {
    return h("div", {}, [h(Provider)]);
  },
};
