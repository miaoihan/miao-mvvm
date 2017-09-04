// ******************************
// this is a very big bug!!!!!!!
// 使用for in 会出错，只会执行最后一个definePro
//      这他妈形成闭包了！
//     所以key永远是最后一个
// *******************************
function compile(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var oldVal = obj[key]
      Object.defineProperty(obj, key, {
        get: function () {
          console.log(`get key ${key}`)
        },
        set: function (newVal) {
          console.log(`${key} seted, from ${oldVal} to ${newVal}`)
        }
      })
    }
  }
}