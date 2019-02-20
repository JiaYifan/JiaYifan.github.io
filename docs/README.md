# JiaYifan.github.io
JiaYifan's Blog

<a href="docs/JavaScript.svg">知识图谱</a>

!> React的生命周期

> 生命周期：一个组件在不同的时期会调用不同时期的函数接口（也就是对应的生命周期函数）

react组件的生命周期总共提供了10个API。

以下实例是React V16生命周期的建议用法。

```javascript
class ExampleComponent extends React.Component {
  // 用于初始化 state
  constructor() {}
  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 因为该函数是静态函数，所以取不到 `this`
  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
  static getDerivedStateFromProps(nextProps, prevState) {}
  // 判断是否需要更新组件，多用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {}
  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  componentDidMount() {}
  // 用于获得最新的 DOM 数据
  getSnapshotBeforeUpdate() {}
  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  componentWillUnmount() {}
  // 组件销毁后调用
  componentDidUnMount() {}
  // 组件更新后调用
  componentDidUpdate() {}
  // 渲染组件函数
  render() {}
  // 以下函数不建议使用
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillUpdate(nextProps, nextState) {}
  UNSAFE_componentWillReceiveProps(nextProps) {}
}
```

* **装载：**

依次执行以下函数：

constructor -- 组件被加载前最先调用，只调用一次

1. `getDefaultProps` --作用于组件类，只调用一次，设置默认的 `props`，对于引用值，会在组件中共享

2. `getIntialState` -- 在ES6语法中废弃了这种写法，作用于组件实例，在组件被实例化的时候被调用一次，用于初始化每个实例的 `State`，此时可以访问 `this.props`，在ES6中可以在constructor使用`this.state={}`

3. 函数体第一句必须是：`super(props)`

`componentWillMount` -- 在完成首次渲染之前调用，只调用一次，此时可以修改组件的 `state`

`render` -- 创建虚拟DOM，需要注意：

1. 只能通过 `this.prop` 和 `this.state` 访问数据

2. 可以返回 `null` 、`false` 和任何 `React` 组件

3. 只能出现一个顶级组件（不能返回数组）

4. 不能改变组件的状态

5. 不能修改DOM输出

`componentDidMount` -- 真实的DOM被渲染出来之后调用，只调用一次，需要注意：

1. 可以通过 `this.DOMNode()` 访问到真实的DOM元素

2. 可是使用其他类库来操作这个DOM

3. 在服务端中，该方法不会被调用

* **更新：**

组件数据发生变化，也就是 `props` 和 `state` 被改变，会依次执行如下函数：

`componentWillReceiveProps` -- 组件接收到新的 `props` 时调用，此时可以更改组件 `props` 和 `state`

1. `props` 是父组件传递给子组件的，父组件发生 `render` 的时候子组件就会调用
```javascript
componentWillReceiveProps: function(nextProps) {
     if (nextProps.bool) {
         this.setState({
             bool: true
         });
     }
 }
```
`shouldComponentUpdate` -- 组件是否应当渲染新的 `props` 和 `state`

1. 返回 `false` 表示跳过后续的生命周期

2. 首次渲染调用了 `forceupdate` 方法后，该方法不会被调用

3. 用来进行性能优化，因为有些变化并不需要重新`render`的，例如前后两次的 `props` 和 `state` 相同，但是不建议使用

```javascript
shouldComponentUpdate: function(nextProps,nextState){}
```
`componentWillUpdate` -- 接收到新的 `props` 和 `state` 之后，进行渲染之前调用，此时不允许更新 `props` 和 `state`

`componentDidUpdate` -- 完成新的 `props` 和 `state` 更新渲染之后调用，此时可以访问到真实的 DOM 

* **卸载：**

销毁组件：`componentWillUnmount` -- 组件被移除之前调用，用于清除一些不必要的东西，例如组件中事件的解绑等...

```javascript
class Demo extends React.Component {
    constructor(props) {
        super(props);
        console.log('组件初始化了');
    }
    componentWillMount() {
        console.log('组件马上就要挂载了');
    }
    // render() 渲染
    componentDidiMount() {
        console.log('组件已经挂载了');
    }
    componentWillReceiveProps(nextProps) {
        console.log('组件要接收父组件的值了');
    }
    shouldComponentUpdate(nextProps,nextState) {
        console.log('判断是不是要更新组件,当返回false的时候，将不执行一下的生命周期方法 ');
        return true;
    }
    componentWillUpdate(nextProps,nextSate) {
        console.log('组件将要被更新了');
    }
    // render() 渲染
    componentDidUpdate(prevProps,prevstate) {
        console.log('组件更新完毕了');
    }
    compoenntWillUnmount() {
        console.log('组件卸载了');
    }
```

!> React父子组件传值

!> redux的使用

!> 共用组件封装

!> webpack中引用哪些插件，怎样自己写loader
css-loader 处理css中路径引用等问题
style-loader 动态把样式写入html
sass-loader scss编译器
less-loader less编译器
postcss-loader css再处理，可以实现css自动补全等功能，但要安装相应的插件和进行相应的配置
babel-loader
jsx-loader
url-loader图片处理
```javascript
{
    test:/\.(jpg|png)$/,
    loaders:'url-loader?limit=8192'
}
```


!> settimeout事件处理机制，会打印出什么值，var函数声明提前（变量提升）

!> 怎样让未知宽高的元素居中（要考虑兼容性）？不用flex和transform？
css/css3实现未知宽高元素的垂直居中和水平居中
其实在平常的一些布局中也经常有要实现元素的垂直居中和水平居中的的需要，下面来写几种css/css3实现的未知宽高元素的水平和垂直居中的写法

ps：不考虑兼容问题（下次会写js实现元素的水平and垂直居中 ）

第一种 css3的transform

复制代码
.ele{
/*设置元素绝对定位*/
    position:absolute;
/*top 50%*/
    top: 50%;
/*left 50%*/
    left: 50%;
/*css3   transform 实现*/
    transform: translate(-50%, -50%);
}
复制代码
第二种 flex盒子布局

复制代码
.ele{
/*弹性盒模型*/    
    display:flex;
/*主轴居中对齐*/
    justify-content: center;
/*侧轴居中对齐*/    
    align-items: center;  
 }
复制代码
第三种 display的table-cell  

复制代码
.box{
/*让元素渲染为表格单元格*/
    display:table-cell;
/*设置文本水平居中*/
    text-align:center; 
/*设置文本垂直居中*/
    vertical-align:middle;     
} 
复制代码
第三种是给父级添加样式。先写这几种， 够大家用了，还有通过伪类实现居中的效果，有兴趣的可以自己敲下试试


!> 对于表单页面如何配置，让其可复用，考虑到级联事件
可以定义表单元素的onchange事件，用bind进行绑定当前上下文，传入表单的name，然后onchange事件里将值写入state，或者不用bind，react在event.target里会提供name以供复用


!> 关注哪些新技术，知不知道react17.6

!> 移动端布局方式，当前选取的rem值怎么用sass计算或者用webpack打包时处理？

根据rem的使用原理，可以知道px转rem需要在html根元素设置一个font-size值，因为rem是相对于html根元素。

方法一、Sass中@function中rem转px

```css
$browser-default-font-size: 16px !default;//变量的值可以根据自己需求定义

html {
    font-size: $browser-default-font-size;
}

@function pxTorem($px){//$px为需要转换的字号
    @return $px / $browser-default-font-size * 1rem;
}
```

定义好@function之后，实际使用中就简单多了：

```css
//SCSS
html {
    font-size: $browser-default-font-size;
}
.header {
    font-size: pxTorem(12px);
}

//CSS
html {
  font-size: 16px; }

.header {
  font-size: 0.75rem; }
```

webpack可以安装postcss
安装postcss-px-to-viewport，设置我们设计稿的宽高，指定需要转换成的视窗单位（建议用vw）等一些配置，就可以把我们的px按百分比转化成vw
```javascript
      "postcss-px-to-viewport": {
        viewportWidth: 750,  //视窗的宽度，对应的是我们设计稿的宽度，一般是750
        viewportHeight: 1334, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
        unitPrecision: 3,       // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
        viewportUnit: ‘vw‘,     // 指定需要转换成的视窗单位，建议使用vw
        selectorBlackList: [‘.ignore‘, ‘.hairlines‘],  // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
        mediaQuery: false       // 允许在媒体查询中转换`px`
      }, 
```

该背的还是要背
一些demo
docsify的注意事项
自己写的script最好放在最上面，不然在github上运行不到（不知为何）
在index.html里引入vue会影响别的页面自己写的script


直接在docsify使用vue

!> **原型链** 定义：每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)

## 计划阅读书籍
《JavaScript深入之执行上下文栈》
《你不知道的JavaScript》上中下

## 未完成内容

使用apply来链接构造器

原型链

发布订阅

call

vue双向绑定原理

js 浮点精度问题怎么解决

事件冒泡或事件捕获？
事件传递有两种方式：冒泡与捕获。

事件传递定义了元素事件触发的顺序。 如果你将 <p> 元素插入到 <div> 元素中，用户点击 <p> 元素, 哪个元素的 "click" 事件先被触发呢？

在 冒泡 中，内部元素的事件会先被触发，然后再触发外部元素，即： <p> 元素的点击事件先触发，然后会触发 <div> 元素的点击事件。

在 捕获 中，外部元素的事件会先被触发，然后才会触发内部元素的事件，即： <div> 元素的点击事件先触发 ，然后再触发 <p> 元素的点击事件。

addEventListener() 方法可以指定 "useCapture" 参数来设置传递类型：

addEventListener(event, function, useCapture);
默认值为 false, 即冒泡传递，当值为 true 时, 事件使用捕获传递。

preventDefault
stopPropagation
https://blog.csdn.net/magic__man/article/details/51782523

在导入vue后，会对自己写的一些样式和script有些冲突，主要是docsify只解析第一个script局限很大，经过努力还是放弃了。下面是不全局导入vue的一个办法，主要涉及知识点有：
* onreadystatechange
* appendChild

```javascript
<script src="assets/iview.min.js"></script>
<link rel="stylesheet" href="assets/iview.css">

<div id="app">
    {{visible}}
</div>

<script type="text/javascript">
// 因为vue在index.html引入会全局引入，不知为何会破坏自己写的script
// 又因为<srcipt src>根本没效果，而且docsify只解析第一个script，所以用这个办法引入vue
var vueScript = document.createElement("script");
vueScript.src = "./assets/vue.min.js";
document.head.appendChild( vueScript );
// 在document和所有子资源已完成加载时，上面的vue才引入进来
var initApplication = function(){
    new Vue({
        el: '#app',
        data: {
            visible: '正在写作'
        },
        methods: {
            show: function () {
                this.visible = true;
            }
        }
    })
}
// 所以使用onreadystatechange方法监听document到哪个阶段了
document.onreadystatechange = function () {
    console.log(document.readyState) // 貌似只能捕获到complete，不知道为啥
    if (document.readyState === "complete") {
        initApplication();
    }
}
</script>
```