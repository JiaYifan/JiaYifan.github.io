# React
React 是一个采用声明式，高效而且灵活的用来构建用户界面的框架。

<a href="demo/reactDemo/index.html">不使用webpack、Babel、JSX的Demo</a>
<a href="../tic-tac-toe/build/index.html">使用create react app做的Demo</a>
## React特点

* 虚拟DOM: React也是以数据驱动的，每次数据变化React都会扫码整个虚拟DOM树，自动计算与上次虚拟DOM的差异变化，然后针对需要变化的部分进行实际的浏览器DOM更新。
组件化： React可以从功能角度横向划分，将UI分解成不同组件，各组件都独立封装，整个UI是由一个个小组件构成的一个大组件，每个组件只关系自身的逻辑，彼此独立。
单项数据流：React设计者认为数据双向绑定虽然便捷，但在复杂场景下副作用也是很明显，所以React更倾向于单向的数据流动-从父节点传递到子节点。（使用ReactLink也可以实现双向绑定，但不建议使用）

注意到我们在写代码的时候，在各个属性直接换了行，这样可以改善我们代码的可读性。并且我们在 JSX 元素的最外层套上了一小括号，以防止 JavaScript 代码在解析时自动在换行处添加分号。

插值

## JSX对照表
因为JS命名规范（变量名区分大小写，允许包含字母、数字、美元符号($)和下划线，但第一个字符不允许是数字，不允许包含空格和其他标点符号）里没有“-”，以及为了防止html、css一些标签和JS保留子冲突，所以JSX的标签在Html和CSS基础上进行了改变，主要是使用JS是驼峰命名法，主要的一些对照关系如下：
|Html或CSS|JSX|
|---|---|
|class|className|
|onclick|onClick|