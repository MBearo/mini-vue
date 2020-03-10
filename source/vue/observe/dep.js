let id = 0
class Dep {
  constructor () {
    this.id = id++
    this.subs = []
  }

  addSub (watcher) {
    this.subs.push(watcher)
  }

  notify () {
    this.subs.forEach(watcher => watcher.update())
  }

  depend () {
    if (Dep.target) {
      // 使 dep 和 watcher 互相关联
      // this 指的 dep
      // target 是 watcher
      // addDep 是 watcher 上的方法
      Dep.target.addDep(this)
    }
  }
}

const stack = []
export function pushTarget (watcher) {
  Dep.target = watcher
  stack.push(watcher)
}
export function popTarget () {
  stack.pop()
  Dep.target = stack[stack.length - 1]
}
export default Dep
