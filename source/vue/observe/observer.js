import { observe } from './index'
import { arrayMethods, observerArray, dependArray } from './array'
import Dep from './dep'

class Observer {
  constructor (data) {
    this.dep = new Dep()
    Object.defineProperty(data, '__ob__', {
      get: _ => this
    })
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
  const childOb = observe(value)
  // 这里相当于每个属性都添加一个 Dep 实例
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get () {
      if (Dep.target) {
        dep.depend()
        if (childOb) {
          childOb.dep.depend()
          dependArray(value)
        }
      }
      return value
    },
    set (newValue) {
      if (value === newValue) return
      observe(newValue)
      value = newValue
      dep.notify()
    }
  })
}
export default Observer
