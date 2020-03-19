
let has = {}
let queue = []
function flushQueue () {
  queue.forEach(watcher => watcher.run())
  has = {}
  queue = []
}
export function queueWatcher (watcher) {
  const id = watcher.id
  if (!has[id]) {
    has[id] = true
    queue.push(watcher)
  }
  nextTick(flushQueue)
}
const callbacks = []
function flushCallbacks () {
  callbacks.forEach(cb => cb())
}
function nextTick (cb) {
  callbacks.push(cb)
  const timerFunc = () => {
    flushCallbacks()
  }
  if (Promise) {
    return Promise.resolve().then(timerFunc)
  }
  if (MutationObserver) {
    const observe = new MutationObserver(timerFunc)
    const textNode = document.createTextNode(1)
    observe.observe(textNode, { characterData: true })
    textNode.textContent(2)
  }
  if (setImmediate) {
    return setImmediate(timerFunc)
  }
  setTimeout(timerFunc, 0)
}
