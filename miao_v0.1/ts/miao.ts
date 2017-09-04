class Miao {
  data: Object

  constructor (option: any) {
    this.data = option.data
  }

  findByKey(name: String) {  // find the value with the key
    for (let key in this.data) {
      if (name == key) {
        return this.data[key]
      }
    }
  }
  init() {
    let html = document.body.innerHTML
    let reg = /\{\{(.*)\}\}/ 
    reg.test(html)
    let key = RegExp.$1
    document.body.textContent = this.findByKey(key) // replace the {{var}}
  }
} 