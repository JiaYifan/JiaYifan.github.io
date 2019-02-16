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



# Axios模板

## Handling Errors
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