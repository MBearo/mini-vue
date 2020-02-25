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
      arr: [1, 2, 3]
    }
  }
})
console.log(vm)
