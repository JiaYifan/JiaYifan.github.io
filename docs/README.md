<!-- <script src="assets/iview.min.js"></script>
<link rel="stylesheet" href="assets/iview.css"> -->
<!-- var iviewScript = document.createElement("script");
iviewScript.src = "./assets/iview.min.js";
document.head.appendChild( iviewScript ); -->
<!-- iview直接引入会有些样式冲突，决定自己用vue写一个组件 -->
<div id="app">
    {{visible}}
</div>

<script type="text/javascript">
// 因为vue在index.html引入会全局引入，不知为何会破坏自己写的script
// 又因为docsify只解析第一个script，所以用这个办法引入vue
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
        // components: {
        //     'Tabs': Tabs
        // },
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

# JiaYifan.github.io
JiaYifan's Blog

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