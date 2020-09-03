import { mutableHandler } from './baseHandlers'
import { isObject } from '../../util/index'

export function reactive (target) {
  return createReactiveObject(target, mutableHandler)
}
function createReactiveObject (target, baseHandler) {
  if (!isObject(target)) {
    return target
  }
  const observed = new Proxy(target, baseHandler)
  return observed
}
