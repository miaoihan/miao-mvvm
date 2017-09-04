/**
 * To observe the object data
 * @param {*object} obj 
 */
function observer(obj) {
  Object.keys(obj).forEach(function (key) {
    var oldVal = obj[key]
    Object.defineProperty(obj, key, {
      get: function () {
        console.log(`get key ${key}`)
      },
      set: function (newVal) {
        console.log(`${key} seted, from ${oldVal} to ${newVal}`)
      }
    })
  })
}

data = {
  name: 'zhangsan',
  age: 18
}

observer(data)

data.age = 20
data.name = 'wangwu'