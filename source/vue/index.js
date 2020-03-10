import { initState } from './observe'
import Watcher from './observe/watcher'

const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

const util = {
  getValue (vm, expr) {
    const keys = expr.split('.')
    return keys.reduce((memo, current) => {
      memo = memo[current]
      return memo
    }, vm)
  },
  compilerText (node, vm) {
    // node.expr 没有的话获取 node.textContent,即为第一次的表达式
    if (!node.expr) {
      node.expr = node.textContent
    }
    node.textContent = node.expr.replace(defaultRE, (...args) => {
      return util.getValue(vm, args[1])
    })
  }
}
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

function Vue (options) {
  this._init(options)
}
export default Vue
