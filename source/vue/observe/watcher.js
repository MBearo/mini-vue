import { pushTarget, popTarget } from './dep'
import { queueWatcher } from './nextTick'
import { util } from '../util'

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
    } else {
      this.getter = function () {
        return util.getValue(vm, exprOrFn)
      }
    }
    if (opts.user) {
      this.user = true
    }
    this.cb = cb
    this.opts = opts
    this.id = id++

    this.depsId = new Set()
    this.deps = []
    // 创建 watcher 先将表达式对应的值取出来，也就是 old value
    this.value = this.get()
    this.immediate = opts.immediate
    if (this.immediate) {
      this.cb(this.value)
    }
  }

  get () {
    pushTarget(this)
    const value = this.getter()
    popTarget()
    return value
  }

  update () {
    queueWatcher(this)
  }

  run () {
    // 新值
    const value = this.get()
    if (value !== this.value) {
      this.cb(value, this.value)
    }
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

export default Watcher
