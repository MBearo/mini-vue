import Observer from './observer'
import Watcher from './watcher'
import Dep from './dep'

export function initState (vm) {
  const opts = vm.$options
  if (opts.data) {
    initData(vm)
  }
  if (opts.computed) {
    initComputed(vm)
  }
  if (opts.watch) {
    initWatch(vm)
  }
}

function initData (vm) {
  let data = vm.$options.data
  data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
  for (const key in data) {
    proxy(vm, '_data', key)
  }
  observe(vm._data)
}
function initComputed (vm) {
  const computed = vm.$options.computed
  const watchers = vm._watchersComputed = Object.create(null)
  for (const key in computed) {
    const userDef = computed[key]
    watchers[key] = new Watcher(vm, userDef, () => { }, { lazy: true })
    // 把声明的key挂到到vm上
    Object.defineProperty(vm, key, {
      get: createComputedGetter(vm, key) // 返回一个function
    })
  }
}
function initWatch (vm) {
  const watch = vm.$options.watch
  for (const key in watch) {
    const userDef = watch[key]
    let handler
    if (userDef.handler) {
      handler = userDef.handler
    } else {
      handler = userDef
    }
    createWatcher(vm, key, handler, { immediate: userDef.immediate })
  }
}

function createComputedGetter (vm, key) {
  const watcher = vm._watchersComputed[key]
  return function () {
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate()
      }
      if (Dep.target) {
        watcher.depend()
      }
      return watcher.value
    }
  }
}

function createWatcher (vm, key, handler, opts) {
  return vm.$watch(key, handler, opts)
}

function proxy (vm, source, key) {
  Object.defineProperty(vm, key, {
    get () {
      return vm[source][key]
    },
    set (newValue) {
      vm[source][key] = newValue
    }
  })
}

export function observe (data) {
  console.log(111, data)
  if (typeof data !== 'object' || data === null) return
  if (data.__ob__) {
    return data.__ob__
  }
  return new Observer(data)
}
