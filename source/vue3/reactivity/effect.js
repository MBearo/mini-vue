export function effect (fn, options = {}) {
  const effect = createReactiveEffect(fn, options)
  if (!options.lazy) {
    effect()
  }
  return effect
}
let uid = 0
let activeEffect = null
const effectStack = []
function createReactiveEffect (fn, options) {
  const effect = function reactiveEffect () {
    // 防止死循环
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect)
        activeEffect = effect
        return fn()
      } finally {
        effectStack.pop()
        activeEffect = effectStack[effectStack.length - 1]
      }
    }
  }
  effect.options = options
  effect.id = uid++
  effect.deps = []
  return effect
}
