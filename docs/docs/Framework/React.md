# React
React 是一个采用声明式，高效而且灵活的用来构建用户界面的框架。

<a href="demo/reactDemo/index.html">不使用webpack、Babel、JSX的Demo</a>
<a href="../tic-tac-toe/build/index.html">使用create react app做的Demo</a>

## React特点

* 虚拟DOM：React也是以数据驱动的，每次数据变化React都会扫码整个虚拟DOM树，自动计算与上次虚拟DOM的差异变化，然后针对需要变化的部分进行实际的浏览器DOM更新。
* 组件化：React可以从功能角度横向划分，将UI分解成不同组件，各组件都独立封装，整个UI是由一个个小组件构成的一个大组件，每个组件只关系自身的逻辑，彼此独立。
* 单项数据流：React设计者认为数据双向绑定虽然便捷，但在复杂场景下副作用也是很明显，所以React更倾向于**单向的数据流动-从父节点传递到子节点**。（使用ReactLink也可以实现双向绑定，但不建议使用）

注意到我们在写代码的时候，在各个属性直接换了行，这样可以改善我们代码的可读性。并且我们在 JSX 元素的最外层套上了一小括号，以防止 JavaScript 代码在解析时自动在换行处添加分号。

插值

> 当你调用 setState 的时候，发生了什么事？

当调用 setState 时，React会做的第一件事情是将传递给 setState 的对象合并到组件的当前状态。这将启动一个称为和解（reconciliation）的过程。和解（reconciliation）的最终目标是以最有效的方式，根据这个新的状态来更新UI。 为此，React将构建一个新的 React 元素树（您可以将其视为 UI 的对象表示）。
一旦有了这个树，为了弄清 UI 如何响应新的状态而改变，React 会将这个新树与上一个元素树相比较（diff）。

通过这样做， React 将会知道发生的确切变化，并且通过了解发生什么变化，只需在绝对必要的情况下进行更新即可最小化 UI 的占用空间。

> 在哪个生命周期事件中你会发出 AJAX 请求，为什么？

AJAX 请求应该在 componentDidMount 生命周期事件中。 有几个原因:

Fiber，是下一次实施React的和解算法，将有能力根据需要启动和停止渲染，以获得性能优势。其中一个取舍之一是 componentWillMount，而在其他的生命周期事件中出发 AJAX 请求，将是具有 “非确定性的”。 这意味着 React 可以在需要时感觉到不同的时间开始调用 componentWillMount。这显然是AJAX请求的不好的方式。

-您不能保证在组件挂载之前，AJAX请求将无法 resolve。如果这样做，那意味着你会尝试在一个未挂载的组件上设置 StState，这不仅不会起作用，反而会对你大喊大叫。 在 componentDidMount 中执行 AJAX 将保证至少有一个要更新的组件。

> React的生命周期

主要分为Reconciliation和解，和Commit阶段，前者过程是可以被打断的，后者则不能有任何的暂停，会一直更新界面直到完成。常用的钩子函数有以下几个：
**Reconciliation 阶段**
Reconciliation[ˌrɛkənˌsɪliˈeʃən] 阶段主要会涉及以下一些生命周期函数：

* componentWillMount：组件即将挂载
* shouldComponentUpdate：判断是否需要更新组件，多用于组件性能优化

在生命周期方法 shouldComponentUpdate 中，允许我们选择退出某些组件（和他们的子组件）的 reconciliation 过程。

我们为什么要这样做？

如上所述，“和解（ reconciliation ）的最终目标是以最有效的方式，根据新的状态更新用户界面”。如果我们知道我们的用户界面（UI）的某一部分不会改变，那么没有理由让 React 很麻烦地试图去弄清楚它是否应该渲染。通过从 shouldComponentUpdate 返回 false，React 将假定当前组件及其所有子组件将保持与当前组件相同。

* componentWillUpdate：组件即将更新了

**Commit 阶段**

Commit 阶段涉及到生命周期函数有：

* componentDidMount：组件挂载后调用，可以在该函数中进行请求或者订阅
* componentDidUpdate：组件更新后调用
* componentWillUnmount：组件即将销毁，可以在此处移除订阅，定时器等等

> 可以选择性地传递给 setState 的第二个参数是什么，它的目的是什么？

一个回调函数，当setState结束并re-rendered该组件时将被调用。一些没有说出来的东西是 setState 是异步的，这就是为什么它需要一个第二个回调函数。通常最好使用另一个生命周期方法，而不是依赖这个回调函数

> 受控组件( controlled component )与不受控制的组件( uncontrolled component )有什么区别？

* 受控组件即即组件负责控制和管理自己的状态。受控组件是React控制的组件，也是表单数据的唯一真理来源。
```javascript
  constructor(props) {
      super(props);
      this.state = {name: ''};
      this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event) {
      this.setState({ name: event.target.value });
  };
  <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
```
* 受控制( uncontrolled component )的组件是您的表单数据由 DOM 处理，而不是您的 React 组件，不受setState()的控制，与传统的HTML表单输入相似，input输入值即显示最新值（使用 ref 从DOM获取表单值）。refs 允许您直接访问DOM元素或组件实例。
```javascript
<input type="text" ref={(input) => this.input = input} />
```

> 什么时候在功能组件( Functional Component )上使用类组件( Class Component )？

如果您的组件具有状态( state )或生命周期方法，请使用 Class 组件。否则，使用功能组件

> React 中的 keys 是什么，为什么它们很重要？

keys 是什么帮助 React 跟踪哪些项目已更改、添加或从列表中删除。主要是keys 使处理列表时更加高效

> React父子组件传值

> redux的使用

> 共用组件封装

<a href="https://www.imooc.com/article/40697"></a>

> 对于表单页面如何配置，让其可复用，考虑到级联事件

可以复用表单的name属性，定义表单元素的onchange事件，用bind进行绑定当前上下文，传入表单的name，然后onchange事件里将值写入state；或者不用bind，react在event.target里会提供name以供复用

## JSX对照表
因为JS命名规范（变量名区分大小写，允许包含字母、数字、美元符号($)和下划线，但第一个字符不允许是数字，不允许包含空格和其他标点符号）里没有“-”，以及为了防止html、css一些标签和JS保留子冲突，所以JSX的标签在Html和CSS基础上进行了改变，主要是使用JS是驼峰命名法，主要的一些对照关系如下：

|Html或CSS|JSX|
|---|---|
|class|className|
|onclick|onClick|
|for|htmlFor|

## Redux

[https://www.jianshu.com/p/e984206553c2](https://www.jianshu.com/p/e984206553c2)

在React中，数据在组件中是单向流动的，数据从一个方向父组件流向子组件（通过props），所以，两个非父子组件之间通信就相对麻烦，redux的出现就是为了解决state里面的数据问题

Redux是将整个应用状态存储到一个地方上称为store，里面保存着一个**状态树store tree**,组件可以派发(dispatch)行为(action)给store,而不是直接通知其他组件，组件内部通过订阅store中的状态state来刷新自己的视图。


