import { observe } from './index'
import { arrayMethods, observerArray, dependArray } from './array'
import Dep from './dep'

class Observer {
  constructor (data) {
    // 专门为数组设置
    this.dep = new Dep()

    // 每个对象包括数组，都有__ob__,返回当前 Observer 实例
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
      defineReactive(data, key, value)
    })
  }
}

export function defineReactive (data, key, value) {
  const childOb = observe(value)
  // 这里相当于每个属性都添加一个 Dep 实例
  // 相同的属性用的相同的dep
  const dep = new Dep()
  Object.defineProperty(data, key, {
    get () {
      if (Dep.target) {
        dep.depend()
        // 数组的依赖收集
        if (childOb) {
          childOb.dep.depend()
          // 子数组的依赖收集
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
