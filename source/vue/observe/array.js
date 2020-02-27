import { observe } from './index'

const oldArrayProtoMethods = Array.prototype

export const arrayMethods = Object.create(oldArrayProtoMethods)

const methods = [
  'pop',
  'push',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
methods.forEach(method => {
  arrayMethods[method] = function (...args) {
    const r = oldArrayProtoMethods[method].apply(this, args)
    console.log('数组方法拦截')
    let inserted = null
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
    }
    if (inserted) observerArray(inserted)
    return r
  }
})

export function observerArray (inserted) {
  for (let i = 0; i < inserted.length; i++) {
    observe(inserted[i])
  }
}
