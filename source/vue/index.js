import { initState } from './observe'

function Vue (options) {
  this._init(options)
}
Vue.prototype._init = function (options) {
  const vm = this
  vm.$options = options

  // 数据初始化
  initState(vm)
}
export default Vue
