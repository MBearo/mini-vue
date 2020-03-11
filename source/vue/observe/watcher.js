import { pushTarget, popTarget } from './dep'
let id = 0
class Watcher {
  /**
   *
   * @param {*} vm
   * @param {*} exprOrFn
   * @param {*} cb
   * @param {*} opts
   */
  constructor (vm, exprOrFn, cb = () => { }, opts = {}) {
    this.vm = vm
    this.exprOrFn = exprOrFn
    if (typeof exprOrFn === 'function') {
      this.getter = exprOrFn
    }
    this.cb = cb
    this.opts = opts
    this.id = id++

    this.depsId = new Set()
    this.deps = []
    this.get()
  }

  get () {
    pushTarget(this)
    this.getter()
    popTarget()
  }

  update () {
    queueWatcher(this)
  }

  run () {
    this.get()
  }

  // 使 watcher 和 dep 互相关联
  addDep (dep) {
    const id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      // this 指 watcher
      dep.addSub(this)
    }
  }
}

let has = {}
let queue = []
function flushQueue () {
  queue.forEach(watcher => watcher.run())
  has = {}
  queue = []
}
function queueWatcher (watcher) {
  const id = watcher.id
  if (!has[id]) {
    has[id] = true
    queue.push(watcher)
  }
  nextTick(flushQueue)
}
const callbacks = []
function flushCallbacks () {
  callbacks.forEach(cb => cb())
}
function nextTick (cb) {
  callbacks.push(cb)
  const timerFunc = () => {
    flushCallbacks()
  }
  if (Promise) {
    return Promise.resolve().then(timerFunc)
  }
  if (MutationObserver) {
    const observe = new MutationObserver(timerFunc)
    const textNode = document.createTextNode(1)
    observe.observe(textNode, { characterData: true })
    textNode.textContent(2)
  }
  if (setImmediate) {
    return setImmediate(timerFunc)
  }
  setTimeout(timerFunc, 0)
}
export default Watcher
