import { initState } from './observe'
import Watcher from './observe/watcher'
import { util } from './util'

Vue.prototype._init = function (options) {
  const vm = this
  vm.$options = options

  // 数据初始化
  initState(vm)

  if (vm.$options.el) {
    vm.$mount()
  }
}
Vue.prototype._update = function () {
  const vm = this
  const el = vm.$el

  const node = document.createDocumentFragment()
  let firstChild
  while (el.firstChild) {
    firstChild = el.firstChild
    node.appendChild(firstChild)
  }
  compiler(node, vm)
  el.appendChild(node)
}
Vue.prototype.$mount = function () {
  const vm = this
  let el = vm.$options.el
  el = vm.$el = query(el)

  const updateComponent = () => {
    vm._update()
  }
  const watcher = new Watcher(vm, updateComponent)
}

Vue.prototype.$watch = function (expr, handler, opts) {
  const vm = this
  const watcher = new Watcher(vm, expr, handler, { user: true, ...opts })
}

function Vue (options) {
  this._init(options)
}

function query (el) {
  if (typeof el === 'string') {
    return document.querySelector(el)
  }
  return el
}

function compiler (node, vm) {
  const childNodes = node.childNodes;
  [...childNodes].forEach(child => {
    if (child.nodeType === 1) {
      compiler(child, vm)
    } else if (child.nodeType === 3) {
      util.compilerText(child, vm)
    }
  })
}

export default Vue
