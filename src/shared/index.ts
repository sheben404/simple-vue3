export const extend = Object.assign;

export const isObject = (val) => {
  return val !== null && typeof val === "object";
};

export const isOnEvent = (key: string) => /on[A-Z]/.test(key);

export const getEventName = (key: string) => key.slice(2).toLowerCase();

export const hasChanged = (oldValue, newValue) => {
  return !Object.is(oldValue, newValue);
};

export const hasOwn = (obj, key) => Object.hasOwnProperty.call(obj, key);

export const camelize = (str: string) => {
  return str.replace(/-(\w)/g, (_, c) => {
    return c ? c.toUpperCase() : "";
  });
};
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
export const toHandlerKey = (str: string) => {
  return str ? "on" + capitalize(str) : "";
};
