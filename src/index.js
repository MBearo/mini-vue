import Vue from 'vue'

const vm = new Vue({
  el: '#app',
  data () {
    return {
      msg: 'hello',
      school: {
        name: 'xiaoming',
        age: 10
      },
      arr: [1, 2, 3],
      firstname: 'a',
      lastname: 'b'
    }
  },
  watch: {
    msg: {
      handler (newVal, oldVal) {
        console.log('watch', newVal, oldVal)
      },
      immediate: true
    }
  },
  computed: {
    fullname () {
      return this.firstname + this.lastname
    }
  }
})
console.log(vm)
setTimeout(_ => {
  vm.msg = 'world'
  vm.lastname = 'z'
}, 1000)
setTimeout(_ => {
  vm.msg = 'world2'
  vm.arr.push(5)
}, 2000)

// let id = 0
// class Watcher {
//   constructor (vm, exprOrFn, cb = () => { }, opts = {}) {
//     this.vm = vm
//     this.exprOrFn = exprOrFn
//     this.cb = cb
//     this.opts = opts
//     this.id = id++
//     if (typeof exprOrFn === 'function') {
//       this.getter = exprOrFn
//     }
//     this.get()
//   }

//   get () {
//     this.getter()
//   }
// }
// class Vue {
//   constructor (options) {
//     const vm = this
//     vm.$options = options
//     initState(vm)
//     if (vm.$options.el) {
//       vm.$mount()
//     }
//   }

//   $mount () {
//     const vm = this
//     let el = vm.$options.el
//     el = vm.$el = query(el)
//     const updateComponent = () => {
//       vm._update()
//     }
//     const watcher = new Watcher(vm, updateComponent)
//   }

//   _update () {
//     const vm = this
//     const el = vm.$el

//     const node = document.createDocumentFragment()
//     let firstChild
//     while (el.firstChild) {
//       firstChild = el.firstChild
//       node.appendChild(firstChild)
//     }
//     compiler(node, vm)
//     el.appendChild(node)
//   }
// }
// function compiler (node, vm) {
//   const childNodes = node.childNodes;
//   [...childNodes].forEach(child => {
//     if (child.nodeType === 1) {
//       compiler(child, vm)
//     } else if (child.nodeType === 3) {
//       util.compilerText(child, vm)
//     }
//   })
// }
// const defaultRE = /\{\{((?:.|\r?\n)+?)\}\}/g

// const util = {
//   getValue (vm, expr) {
//     const keys = expr.split('.')
//     return keys.reduce((memo, current) => {
//       memo = memo[current]
//       return memo
//     }, vm)
//   },
//   compilerText (node, vm) {
//     // node.expr 没有的话获取 node.textContent,即为第一次的表达式
//     if (!node.expr) {
//       node.expr = node.textContent
//     }
//     node.textContent = node.expr.replace(defaultRE, (...args) => {
//       return util.getValue(vm, args[1])
//     })
//   }
// }
// function query (el) {
//   if (typeof el === 'string') {
//     return document.querySelector(el)
//   }
//   return el
// }
// const oldArrayProtoMethods = Array.prototype
// const arrayMethods = Object.create(oldArrayProtoMethods)
// const methods = [
//   'pop',
//   'push',
//   'shift',
//   'unshift',
//   'splice',
//   'sort',
//   'reverse'
// ]
// methods.forEach(method => {
//   arrayMethods[method] = function (...args) {
//     const r = oldArrayProtoMethods[method].apply(this, args)
//     console.log('数组方法拦截')
//     // 如果是新增，需要监听
//     let inserted = null
//     switch (method) {
//       case 'push':
//       case 'unshift':
//         inserted = args
//         break
//       case 'splice':
//         inserted = args.slice(2)
//     }
//     if (inserted) observerArray(inserted)
//     return r
//   }
// })
// function observerArray (inserted) {
//   for (let i = 0; i < inserted.length; i++) {
//     observe(inserted[i])
//   }
// }
// class Observer {
//   constructor (data) {
//     if (Array.isArray(data)) {
//       Object.setPrototypeOf(data, arrayMethods)
//       observerArray(data)
//     } else {
//       this.walk(data)
//     }
//   }

//   walk (data) {
//     Object.entries(data).forEach(([key, value]) => {
//       defineReactive(data, key, value)
//     })
//   }
// }

// function initState (vm) {
//   const opts = vm.$options
//   if (opts.data) {
//     initData(vm)
//   }
// }

// function initData (vm) {
//   let data = vm.$options.data
//   data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}
//   for (const key in data) {
//     proxy(vm, '_data', key)
//   }
//   observe(vm._data)
// }

// function proxy (vm, source, key) {
//   Object.defineProperty(vm, key, {
//     get () {
//       return vm[source][key]
//     },
//     set (val) {
//       vm[source][key] = val
//     }
//   })
// }

// function observe (data) {
//   if (typeof data !== 'object' || data === null) return
//   return new Observer(data)
// }
// function defineReactive (data, key, value) {
//   Object.defineProperty(data, key, {
//     get () {
//       return value
//     },
//     set (newVal) {
//       value = newVal
//     }
//   })
// }

// const vm = new Vue({
//   el: '#app',
//   data () {
//     return {
//       msg: 'hello'
//     }
//   }
// })
