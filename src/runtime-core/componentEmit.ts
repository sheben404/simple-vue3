import { camelize, toHandlerKey } from "../shared/index";

export function emit(instance, event, ...args) {
  console.log("emit", event);
  const { props } = instance;
  const handlerKey = toHandlerKey(camelize(event));
  const handler = props[handlerKey];
  handler && handler(...args);
}
