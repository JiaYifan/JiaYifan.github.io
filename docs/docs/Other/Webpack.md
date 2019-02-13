# Webpack

## 前端为什么需要WebPack？

前端网页功能丰富，特别是SPA（single page web application 单页应用）技术流行后，JavaScript的复杂度增加和需要一大堆依赖包，还需要解决SCSS，Less……新增样式的扩展写法的编译工作。所以现代化的前端已经完全依赖于WebPack的辅助了。

## 什么是WebPack？

> WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Sass，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。在3.0出现后，Webpack还肩负起了优化项目的责任。

这段话有三个重点：

* 打包：可以把多个Javascript文件打包成一个文件，减少服务器压力和下载带宽。
* 转换：把拓展语言转换成为普通的JavaScript，让浏览器顺利运行。
* 优化：前端变的越来越复杂后，性能也会遇到问题，而WebPack也开始肩负起了优化和提升性能的责任。

## 安装
```javascript
// 全局安装
npm install -g webpack
// 初始化
npm init -y
// 项目安装
npm install --save-dev webpack
```

## Webpack配置、打包
最简单的：
```javascript
webpack {entry file} {destination for bundled file}
// 例如
```
* {entery file}:入口文件的路径，本文中就是src/entery.js的路径；
* {destination for bundled file}:填写打包后存放的路径。
* 注意：在命令行中是不需要写{ }的。

### 配置文件：入口和出口

**webpack.config.js**

```javascript
module.exports={
    //入口文件的配置项
    entry:{},
    //出口文件的配置项
    output:{},
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```
#### entry选项（入口配置）

```javascript
module.exports={
    //入口文件的配置项
    entry:{},
    //出口文件的配置项
    output:{},
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}
```