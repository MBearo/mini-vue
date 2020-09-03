import { isObject, hasOwn, hasChanged } from '../../util'
import { reactive } from './reactive'

const get = createGetter()
const set = createSetter()

function createGetter () {
  return function get (target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    console.log('取值了', target, key)
    if (isObject(res)) {
      return reactive(res)
    }
    return res
  }
}
function createSetter () {
  return function get (target, key, value, receiver) {
    const hadkey = hasOwn(target, key)
    const oldValue = target[key]
    const res = Reflect.set(target, key, value, receiver) // target[key]=value
    if (!hadkey) {
      console.log('属性新增', target, key)
      // 比如数组操作，会有 push 和 length 的操作
      // 但是length已经没有意义，因为值已经变了，所以判断值如果相等，就不操作了
    } else if (hasChanged(value, oldValue)) {
      console.log('属性修改', target, key)
    }
    console.log('设置值了', target, key)
    return res
  }
}
export const mutableHandler = {
  get,
  set
}
