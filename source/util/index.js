export function isObject (value) {
  return typeof value === 'object' && value !== null
}
export function hasOwn (target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}
export function hasChanged (newValue, oldValue) {
  return newValue !== oldValue
}
