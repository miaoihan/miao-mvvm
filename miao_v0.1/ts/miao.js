var Miao = (function () {
    function Miao(option) {
        this.data = option.data;
    }
    Miao.prototype.findByKey = function (name) {
        for (var key in this.data) {
            if (name == key) {
                return this.data[key];
            }
        }
    };
    Miao.prototype.init = function () {
        var html = document.body.innerHTML;
        var reg = /\{\{(.*)\}\}/;
        reg.test(html);
        var key = RegExp.$1;
        document.body.textContent = this.findByKey(key); // replace the {{var}}
    };
    return Miao;
}());
