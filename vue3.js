// mini

const baseHandler = {
  get (target, key) {
    // Reflect.get
    const res = target[key]
    // 尝试取值
    track(target, key)
    return typeof res === 'object' ? recative(res) : res
  },
  set (target, key, val) {
    const info = { oldValue: target[key], newValue: val }
    target[key] = val
    trigger(target, key, info)
  }
}
function recative (target) {
  const observed = new Proxy(target, baseHandler)
  return observed
}
function computed (fn) {
  const runner = effect(fn, { computed: true, lazy: true })
  return {
    effect: runner,
    get value () {
      return runner()
    }
  }
}
function effect (fn, options = {}) {
  const e = createReactiveEffect(fn, options)
  if (!options.lazy) {
    // 不是懒执行
    e()
  }
  return e
}
function createReactiveEffect (fn, options) {
  const effect = function effect (...args) {
    return run(effect, fn, args)
  }
  effect.deps = []
  effect.computed = options.computed
  effect.lazy = options.lazy
  return effect
}
function run (effect, fn, args) {
  // 执行effect
  if (effectStack.indexOf(effect === -1)) {
    try {
      effectStack.push(effect)
      return fn(...args)
    } finally {
      effectStack.pop()
    }
  }
}
const effectStack = [] // 存储effect
const targetMap = new WeakMap()
function track (target, key) {
  // 收集依赖
  // {
  //   target:{
  //     key:['包装后的effect']
  //   }
  // }
  const effect = effectStack[effectStack.length - 1]
  if (effect) {
    let depMap = targetMap.get(target)
    if (depMap === undefined) {
      depMap = new Map()
      targetMap.set(key, depMap)
    }
    let dep = depMap.get(key)
    if (dep === undefined) {
      dep = new Set()
      depMap.set(key, dep)
    }
    // 容错
    if (!dep.has(effect)) {
      // 新增依赖
      dep.add(effect)
      // 双向存储
      effect.deps.push(dep)
    }
  }
}
function trigger (target, key, info) {
  // 1找到依赖
  const depMap = targetMap.get(target)
  if (depMap === undefined) {
    return
  }
  // 分开，普通的effect和computed有一个优先级
  // effects 先执行，computed后执行
  // 因为computed会可能依赖普通的effects
  const effects = new Set()
  const computedRunners = new Set()
  if (key) {
    const deps = depMap.get(key)
    deps.forEach(effect => {
      if (effect.computed) {
        computedRunners.add(effect)
      } else {
        effects.add(effect)
      }
    })
    effects.forEach(effect => effect())
    computedRunners.forEach(computed => computed())
  }
}
