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