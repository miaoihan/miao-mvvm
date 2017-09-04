/*!
 * @author zhanghan <miaoihan@gmail.com>
 * date 9/1/2017
 * My v0.1 MVVM framework named Miao
 */
function Miao(option) {
  this.data = option.data
  this.init() // init, replace the template variable like {{var}}
}

Miao.prototype = {
  findByKey : function(name) {  // find the value with the key
    for (var key in this.data) {
      if (name == key) {
        return this.data[key]
      }
    }
  },
  init: function() {
    var html = document.body.innerHTML
    var reg = /\{\{(.*)\}\}/ 
    reg.test(html)
    var key = RegExp.$1
    document.body.textContent = this.findByKey(key) // replace the {{var}}
  }
}

