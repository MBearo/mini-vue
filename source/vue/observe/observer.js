import { observe } from './index'

class Observer {
  constructor (data) {
    this.walk(data)
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
      value = newValue
    }
  })
}
export default Observer
