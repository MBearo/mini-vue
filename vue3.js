//mini

const baseHandler = {
  get(target, key) {
    // Reflect.get
    const res = target[key]
    //尝试取值
    track(target, key)
    return typeof 
  }
}

function computed() {

}
function effect() {

}
let targetMap=new WeakMap()
function track(target,key) {
  //收集依赖
  // {
  //   target:{
  //     key:['依赖函数1']
  //   }
  // }

}
function trigger() {

}