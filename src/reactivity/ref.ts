import { hasChanged, isObject } from "../shared";
import { isTracking, trackEffects, triggerEffects } from "./effect";
import { reactive } from "./reactive";

class RefImpl {
  private _value;
  private _rawValue;
  public dep;
  public __v_isRef = true;
  constructor(value) {
    this.dep = new Set();
    this._rawValue = value;
    this._value = convert(value);
  }
  get value() {
    if (isTracking()) {
      trackEffects(this.dep);
    }
    return this._value;
  }

  set value(newValue) {
    if (hasChanged(this._rawValue, newValue)) {
      this._rawValue = newValue;
      this._value = convert(newValue);
      triggerEffects(this.dep);
    }
  }
}

function convert(value) {
  return isObject(value) ? reactive(value) : value;
}

export function ref(value) {
  return new RefImpl(value);
}

export function isRef(obj) {
  return !!obj.__v_isRef;
}

export function unRef(obj) {
  return isRef(obj) ? obj.value : obj;
}

export function proxyRefs(objWithRefs) {
  return new Proxy(objWithRefs, {
    get(target, key) {
      return unRef(Reflect.get(target, key));
    },
    set(target, key, newValue) {
      if (isRef(target[key]) && !isRef(newValue)) {
        return (target[key].value = newValue);
      } else {
        return Reflect.set(target, key, newValue);
      }
    },
  });
}
