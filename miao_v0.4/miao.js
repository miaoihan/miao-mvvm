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
    // var html = this.html, // keep origin
    //     reg = /\{\{(.*?)\}\}/g,
    //     key
    // while ((key = reg.exec(html)) != null) { // must do like this, if not will in a endless loop
    //   // key[0] is '{{key}}', key[1] is 'key'
    //   html = html.replace(key[0], this.getValueByKey(key[1])) // replace all the {{key}} to a object value
    // }
    // this.render(node, html) // replace the {{var}}

    var mo = this
    var isElementNode = function(node) {
      return node.nodeType == 1
    } 
    var isDirective = function(attr) {
      return attr.indexOf('m-') == 0
    } 
    // compile one node
    var cmplElement = function(node) {    // EX:
      for(var attr of node.attributes){   // attr: m-model = "age"
        attrName = attr.name              // attrName: m-model
        if (isDirective(attrName)){
          var exp = attr.value            // exp: age
          var dir = attrName.substring(2) // dir: model
          node.value = mo.data[exp]
          node.oninput = function(e) {    // add listener with input
            var newVal = e.target.value
            mo.data[exp] = newVal
          }
        }
      }
    } 
    var childNodes = this.node.childNodes // get children nodes
    for(var node of childNodes) {
      if (isElementNode(node)){
        cmplElement(node)
      }
    }
  },
  /**
   * To observe the object data
   * @param {*object} data 
   */
  observe: function (data) {
    var mo = this
    Object.keys(data).forEach(function (key) {
      var oldVal = data[key] // closure to save the old value
      console.log(`${key}: ${data[key]}`);
      Object.defineProperty(data, key, {
        get: function () {
          console.log(`get key ${key}`)
          return oldVal // return a value, otherwise it will return empty 
        },
        set: function (newVal) {
          console.log(`${key} seted, from ${oldVal} to ${newVal}`)
          oldVal = newVal
          mo.compile(mo.node) //not do like this, should be a notify
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