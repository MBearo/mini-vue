import { observe } from './index'
import { arrayMethods, observerArray } from './array'

class Observer {
  constructor (data) {
    if (Array.isArray(data)) {
      Object.setPrototypeOf(data, arrayMethods)
      // 监听数组里的每一项
      observerArray(data)
    } else {
      this.walk(data)
    }
  }

  walk (data) {
    Object.entries(data).forEach(([key, value]) => {
      definReactive(data, key, value)
    })
  }
}
export function definReactive (data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get () {
      return value
    },
    set (newValue) {
      if (value === newValue) return
      observe(newValue)
      value = newValue
    }
  })
}
export default Observer
