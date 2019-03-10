ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的一代标准，于 2015 年 6 月正式发布。它的目标，是使得 JavaScript 语言可以用来编写复杂的大型应用程序，成为企业级开发语言。

## let
<span id="let"></span>

* `let`所声明的变量，只在所在的代码块里（大括号）有效
* 不会变量提升
* 因此很适合`for`循环（`for`循环还有一个特别之处，就是设置循环变量的那部分是一个父作用域，而循环体内部是一个单独的子作用域）
* 还有解决一些之前用闭包来解决的问题
* 暂时性死区：声明了`let`就无视外部声明的`var`
* 不允许重复声明：`let`不允许在相同作用域内，重复声明同一个变量。
* ES6 引入了块级作用域，明确允许在块级作用域之中声明函数。

## const
<span id="const"></span>

* `const`声明一个只读的常量。一旦声明，常量的值就不能改变。
* 所以一旦声明必须立即初始化，`const foo;`会报错
* `const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。
* `const`命令声明的常量也是不提升，同样存在暂时性死区、不可重复声明。

## Promise

`Promise` 对象用于表示一个异步操作的最终状态（完成或失败），以及其返回的值。

```javascript
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(function() {
    resolve('foo');
  }, 300);
});

promise1.then(function(value) {
  console.log(value);
  // expected output: "foo"
});

console.log(promise1);
// expected output: [object Promise]
```
**语法**
```javascript
new Promise( function(resolve, reject) {...} /* executor */  );
```
`executor`是带有 `resolve` 和 `reject` 两个参数的函数 。`Promise`构造函数执行时立即调用`executor` 函数， `resolve` 和 `reject` 两个函数作为参数传递给`executor`（`executor` 函数在`Promise`构造函数返回新建对象前被调用）。`resolve` 和 `reject` 函数被调用时，分别将`promise`的状态改为`fulfilled`（完成）或`rejected`（失败）。`executor` 内部通常会执行一些异步操作，一旦完成，可以调用`resolve`函数来将`promise`状态改成`fulfilled`，或者在发生错误时将它的状态改为`rejected`。
如果在`executor`函数中抛出一个错误，那么该`promise` 状态为`rejected`。`executor`函数的返回值被忽略。

> 通俗来说入参里的 `resolve` 和 `reject` 是对应状态下的两个回调函数，只能接受并处理一个参数，多余的参数会被忽略掉，`promise1.then(function(value) {});`就是 `promise1` resolve 时执行的回调函数，入参是`resolve('foo');`时指定了`'foo'`

### Promise.resolve
`Promise.resolve(value)`方法返回一个以给定值解析后的`Promise` 对象。但如果这个值是个`thenable`（即带有`then`方法），返回的`promise`会“跟随”这个`thenable`的对象，采用它的最终状态（指`resolved/rejected/pending/settled`）；如果传入的`value`本身就是`promise`对象，则该对象作为`Promise.resolve`方法的返回值返回；否则以该值为成功状态返回`promise`对象。

```javascript
var promise1 = Promise.resolve(123);

promise1.then(function(value) {
  console.log(value);
  // expected output: 123
});
```

### Promise.reject
`Promise.reject(reason)`方法返回一个带有拒绝原因`reason`参数的`Promise`对象。通过使用`Error`的实例获取错误原因`reason`对调试和选择性错误捕捉很有帮助。
```javascript
Promise.reject("Testing static reject").then(function(reason) {
  // 未被调用
}, function(reason) {
  console.log(reason); // "Testing static reject"
});

Promise.reject(new Error("fail")).then(function(result) {
  // 未被调用
}, function(error) {
  console.log(error); // stacktrace
});
```

### Promise.all
`Promise.all(iterable)` 方法返回一个 `Promise` 实例，此实例在 `iterable` 参数内所有的 `promise` 都“完成（`resolved`）”或参数中不包含 `promise` 时回调完成（`resolve`）；如果参数中  `promise` 有一个失败（`rejected`），此实例回调失败（`reject`），失败原因的是第一个失败 `promise` 的结果。

```javascript
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then(function(values) {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

## Reflect
`Reflect` 是一个内置的对象，它提供拦截 JavaScript 操作的方法。这些方法与处理器对象的方法相同。`Reflect`不是一个函数对象，因此它是不可构造的。

与大多数全局对象不同，`Reflect`没有构造函数。你不能将其与一个`new`运算符一起使用，或者将`Reflect`对象作为一个函数来调用。`Reflect`的所有属性和方法都是静态的（就像`Math`对象）。
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect#%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9"></a>

