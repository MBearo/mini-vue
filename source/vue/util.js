const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

export const util = {
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
