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
    this.get()
  }

  // 使 watcher 和 dep 互相关联
  addDep (dep) {
    const id = dep.id
    if (!this.depsId.has(id)) {
      this.depsId.add(id)
      this.deps.push(dep)
      dep.addSub(this)
    }
  }
}
export default Watcher
