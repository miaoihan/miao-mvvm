/*!
 * @author zhanghan <miaoihan@gmail.com>
 * date 9/1/2017
 * My v0.1 MVVM framework named Miao
 */
function Miao(option) {
  this.el = option.el
  this.node = document.querySelector(this.el)
  this.html = this.node.innerHTML
  this.data = option.data

  this.init() // init, replace the template variable like {{var}
  this.observe(this.data)
}

Miao.prototype = {
  getValueByKey: function (name) { // find the value with the key
    for (var key in this.data) {
      if (name == key) {
        return this.data[key]
      }
    }
  },
  /**
   * compile node
   * @param {* node to be compiled} node 
   */
  compile: function (node) {
    var html = this.html
    var reg = /\{\{(.*?)\}\}/g
    var key
    while ((key = reg.exec(html)) != null) { // must do like this, if not will in a endless loop
      // key[0] is '{{key}}', key[1] is 'key'
      html = html.replace(key[0], this.getValueByKey(key[1])) // replace all the {{key}} to a object value
    }
    this.render(node, html) // replace the {{var}}
  },
  /**
   * To observe the object data
   * @param {*object} obj 
   */
  observe: function (obj) {
    var mo = this
    Object.keys(obj).forEach(function (key) {
      var oldVal = obj[key] // closure to save the old value
      console.log(`${key}: ${obj[key]}`);
      Object.defineProperty(obj, key, {
        get: function () {
          console.log(`get key ${key}`)
          return oldVal // return a value, otherwise it will return empty 
        },
        set: function (newVal) {
          console.log(`${key} seted, from ${oldVal} to ${newVal}`)
          oldVal = newVal
          mo.compile(mo.node)
        }
      })
    })
  },
  /**
   * render html
   * @param {*} html 
   */
  render: function (node, html) {
    node.innerHTML = html
  },
  init: function () {
    this.compile(this.node)
  }
}