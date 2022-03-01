class ReactiveEffect {
  private _fn;
  constructor(fn, public scheduler) {
    this._fn = fn;
  }
  run() {
    activeEffect = this;
    return this._fn();
  }
}

const targetMap = new Map();
export function track(target, key) {
  let depMap = targetMap.get(target);
  if (!depMap) {
    depMap = new Map();
    targetMap.set(target, depMap);
  }
  let dep = depMap.get(key);
  if (!dep) {
    dep = new Set();
    depMap.set(key, dep);
  }
  dep.add(activeEffect);
}

export function trigger(target, key) {
  const depMap = targetMap.get(target);
  const dep = depMap.get(key);
  for (const effect of dep) {
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}

let activeEffect;
export function effect(fn, option: any = {}) {
  const _effect = new ReactiveEffect(fn, option.scheduler);
  _effect.run();
  return _effect.run.bind(_effect);
}
