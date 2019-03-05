# VUE

<a href="demo/mindMap/zoomableCollapsibleTree.html?vue">Vue 2.0 + Vue Router + Vuex 思维导图</a>

<a href="demo/vueDemo/index.html">不使用webpack和Babel的Demo</a>

## 面试题

**VUE 生命周期**

<img id="vuelifecycle" src="img/vuelifecycle.png" style="height:100px" alt="生命周期图示" />

1. 什么是vue生命周期？

答： Vue 实例从创建到销毁的过程，就是生命周期。也就是从开始创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

2. vue生命周期的作用是什么？

答：它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。

3. vue生命周期总共有几个阶段？

答：它可以总共分为8个阶段：创建前/后, 载入前/后,更新前/后,销毁前/销毁后

4. 第一次页面加载会触发哪几个钩子？

答：第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个钩子

5. DOM 渲染在 哪个周期中就已经完成？

答：DOM 渲染在 mounted 中就已经完成了。

6. 简单描述每个周期具体适合哪些场景？

答：生命周期钩子的一些使用方法： beforecreate : 可以在这加个loading事件，在加载实例时触发 created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用 mounted : 挂载元素，获取到DOM节点 updated : 如果对数据统一处理，在这里写上相应函数 beforeDestroy : 可以做一个确认停止事件的确认框 nextTick : 更新数据后立即操作dom


## hash模式和history模式区别

[https://www.jianshu.com/p/3fcae6a4968f?open_source=weibo_search](https://www.jianshu.com/p/3fcae6a4968f?open_source=weibo_search)

> 众所周知，vue-router有两种模式，hash模式和history模式，这里来谈谈两者的区别。

对于 Vue 这类渐进式前端开发框架，为了构建 SPA（单页面应用），需要引入前端路由系统，这也就是 Vue-Router 存在的意义。前端路由的核心，就在于 —— 改变视图的同时不会向后端发出请求。

为了达到这一目的，浏览器当前提供了以下两种支持：

1. hash —— 即地址栏 URL 中的 # 符号（此 hash 不是密码学里的散列运算）。
比如这个 URL：http://www.abc.com/#/hello，hash 的值为 #/hello。它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2. history —— 利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法。（需要特定浏览器支持）
这两个方法应用于浏览器的历史记录栈，在当前已有的 `back、forward、go` 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

因此可以说，hash 模式和 history 模式都属于浏览器自身的特性，Vue-Router 只是利用了这两个特性（通过调用浏览器提供的接口）来实现前端路由。


#### hash模式

hash模式背后的原理是`onhashchange`事件,可以在`window`对象上监听这个事件:

```javascript
window.onhashchange = function(event){
     console.log(event.oldURL, event.newURL);
     let hash = location.hash.slice(1); 
     document.body.style.color = hash;
}
```
上面的代码可以通过改变hash来改变页面字体颜色，虽然没什么用，但是一定程度上说明了原理。

更关键的一点是，**因为hash发生变化的url都会被浏览器记录下来**，从而你会发现浏览器的前进后退都可以用了，同时点击后退时，页面字体颜色也会发生变化。这样一来，尽管浏览器没有请求服务器，但是页面状态和url一一关联起来，后来人们给它起了一个霸气的名字叫前端路由，成为了单页应用标配。

#### history路由

随着**history api**的到来，前端路由开始进化了,前面的`hashchange`，你只能改变`#`后面的`url`片段，而**history api**则给了前端完全的自由

**history api**可以分为两大部分，切换和修改，参考MDN，切换历史状态包括`back、forward、go`三个方法，对应浏览器的前进，后退，跳转操作，有同学说了，(谷歌)浏览器只有前进和后退，没有跳转，嗯，在前进后退上长按鼠标，会出来所有当前窗口的历史记录，从而可以跳转(也许叫跳更合适)：
````javascript
history.go(-2);//后退两次
history.go(2);//前进两次
history.back(); //后退
hsitory.forward(); //前进
````

修改历史状态包括了`pushState,replaceState`两个方法,这两个方法接收三个参数:`stateObj,title,url`

```javascript
history.pushState({color:'red'}, 'red', 'red')
history.back();
setTimeout(function(){
    history.forward();
 },0)
window.onpopstate = function(event){
     console.log(event.state)
     if(event.state && event.state.color === 'red'){
           document.body.style.color = 'red';
      }
}
```

通过`pushstate`把页面的状态保存在`state`对象中，当页面的`url`再变回这个`url`时，可以通过`event.state`取到这个`state`对象，从而可以对页面状态进行还原，这里的页面状态就是页面字体颜色，其实滚动条的位置，阅读进度，组件的开关的这些页面状态都可以存储到`state`的里面。

!> history模式的问题

通过**history api**，我们丢掉了丑陋的`#`，但是它也有个问题：不怕前进，不怕后退，就怕**刷新(f5)**，（如果后端没有准备的话）,因为刷新是实实在在地去请求服务器的,不玩虚的。

在hash模式下，前端路由修改的是`#`中的信息，而浏览器请求时是不带它玩的，所以没有问题；但是在history下，你可以自由的修改path，当刷新时，如果服务器中没有相应的响应或者资源，会分分钟刷出一个404来。


## Axios模板

#### Handling Errors
```javascript
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });
```

<script type="text/javascript">
var vuelifecycle = document.getElementById("vuelifecycle");
vuelifecycle.onclick = function(){
  window.open("img/vuelifecycle.png")
}
</script>