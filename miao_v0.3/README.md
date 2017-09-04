# MVVMa框架 v0.3版本
----------
## 功能
- 可以支持指令识别渲染
- m-model双向绑定

## 模块
- Miao模块
- compile解析模块
- render模块
- observe模块

## 说明
- 这个版本加入了m-model指令，下个版本加入更多的指令识别
- [bugs] 因为compile的实现是innerHTML，所以每次input都会更新视图，导致页面断层了
