* [apply](#apply)
* [call](#call)

> 简单地说：调用一个对象的一个方法，用另一个对象替换当前对象。例如：`B.apply(A, arguments);`或`B.call(A, args1,args2);`即 `A` 对象应用 `B` 对象的方法。

## Function.prototype.apply()
<span id="apply"></span>

apply() 方法调用一个具有给定this值的函数，以及作为一个数组（或类似数组对象）提供的参数。

!> call()方法的作用和 apply() 方法类似，区别就是call()方法接受的是参数列表，而apply()方法接受的是一个参数数组。

> JavaScript Demo: Function.apply()

```javascript
var numbers = [5, 6, 2, 3, 7];

var max = Math.max.apply(null, numbers);

console.log(max);
// expected output: 7

var min = Math.min.apply(null, numbers);

console.log(min);
// expected output: 2
```
### 语法

```javascript
func.apply(thisArg, [argsArray])
```

### 参数
`thisArg`

可选的。在 `func` 函数运行时使用的 `this` 值。请注意，`this` 可能不是该方法看到的实际值：如果这个函数处于非严格模式下，则指定为 `null` 或 `undefined` 时会自动替换为指向全局对象，原始值会被包装。

`argsArray`

可选的。一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `func` 函数。如果该参数的值为 `null` 或  `undefined`，则表示不需要传入任何参数。从ECMAScript 5 开始可以使用类数组对象。 浏览器兼容性 请参阅本文底部内容。

apply 可以使用数组字面量（array literal），如 `fun.apply(this, ['eat', 'bananas'])`，或数组对象， 如  `fun.apply(this, new Array('eat', 'bananas'))`

!> 需要注意：Chrome 14 以及 Internet Explorer 9 仍然不接受类数组对象。如果传入类数组对象，它们会抛出异常。

### 返回值
调用有指定`this`值和参数的函数的结果。

### Demo

#### 用 apply 将数组添加到另一个数组

我们可以使用`push`将元素追加到数组中。并且，因为`push`接受可变数量的参数，我们也可以一次推送多个元素。但是，如果我们传递一个数组来推送，它实际上会将该数组作为单个元素添加，而不是单独添加元素，因此我们最终得到一个数组内的数组。如果那不是我们想要的怎么办？在这种情况下，`concat`确实具有我们想要的行为，
> concat() 方法用于连接两个或多个数组。该方法不会改变现有的数组，而仅仅会返回被连接数组的一个副本。[[1]](#r1)

但它实际上并不附加到现有数组，而是创建并返回一个新数组。 但是我们想要附加到我们现有的阵列......那么现在呢？ 写一个循环？当然不是吗？

apply来帮你！

```javascript
var array = ['a', 'b'];
var elements = [0, 1, 2];
array.push.apply(array, elements);
console.info(array); // ["a", "b", 0, 1, 2]
```

#### 使用apply和内置函数

聪明的apply用法允许你在某些本来需要写成遍历数组变量的任务中使用内建的函数。在接下里的例子中我们会使用Math.max/Math.min来找出一个数组中的最大/最小值。

```javascript
/* 找出数组中最大/小的数字 */
var numbers = [5, 6, 2, 3, 7];

/* 应用(apply) Math.min/Math.max 内置函数完成 */
var max = Math.max.apply(null, numbers); /* 基本等同于 Math.max(numbers[0], ...) 或 Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);

/* Math.min() 返回零个或更多个数值的最小值。 */
/* 如Math.min( 2 , 30 ,1 , 200-10 , 300*22 , 20-30 )返回-10 */

/* 代码对比： 用简单循环完成 */
max = -Infinity, min = +Infinity;

for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] > max)
    max = numbers[i];
  if (numbers[i] < min) 
    min = numbers[i];
}
```

!> 但是当心：如果用上面的方式调用apply，会有超出JavaScript引擎的参数长度限制的风险。

当你对一个方法传入非常多的参数（比如一万个）时，就非常有可能会导致越界问题, 这个临界值是根据不同的 JavaScript 引擎而定的（JavaScript 核心中已经做了硬编码  参数个数限制在65536），因为这个限制（实际上也是任何用到超大栈空间的行为的自然表现）是未指定的. 有些引擎会抛出异常。更糟糕的是其他引擎会直接限制传入到方法的参数个数，导致参数丢失。举个例子：如果某个引擎限制了方法参数最多为4个（实际真正的参数个数限制当然要高得多了, 这里只是打个比方）, 上面的代码中, 真正通过 apply传到目标方法中的参数为 5, 6, 2, 3 而不是完整的数组。

如果你的参数数组可能非常大，那么推荐使用下面这种策略来处理：将参数数组切块后循环传入目标方法：

```javascript
function minOfArray(arr) {
  var min = Infinity; // 全局属性 Infinity 是一个数值，表示无穷大。
  var QUANTUM = 32768;

  for (var i = 0, len = arr.length; i < len; i += QUANTUM) {
    var submin = Math.min.apply(null, arr.slice(i, Math.min(i + QUANTUM, len)));
    min = Math.min(submin, min);
  }

  return min;
}

var min = minOfArray([5, 6, 2, 3, 7]);
```

#### 使用apply来链接构造器

你可以使用`apply`来链接一个对象构造器，类似于`Java`。在接下来的例子中我们会创建一个全局 `Function` 对象的`construct`方法 ，来使你能够在构造器中使用一个类数组对象而非参数列表。

```javascript
Function.prototype.construct = function (aArgs) {
  var oNew = Object.create(this.prototype);
  this.apply(oNew, aArgs);
  return oNew;
};
```


!> 注意: 上面使用的`Object.create()`方法相对来说比较新。另一种可选的方法，请考虑如下替代方法：

Using Object.__proto__:

```javascript
Function.prototype.construct = function (aArgs) {
  var oNew = {};
  oNew.__proto__ = this.prototype;
  this.apply(oNew, aArgs);
  return oNew;
};
```

使用闭包：

```javascript
Function.prototype.construct = function(aArgs) {
  var fConstructor = this, fNewConstr = function() {
    fConstructor.apply(this, aArgs);
  };
  fNewConstr.prototype = fConstructor.prototype;
  return new fNewConstr();
};
```

使用 Function 构造器：

```javascript
Function.prototype.construct = function (aArgs) {
  var fNewConstr = new Function("");
  fNewConstr.prototype = this.prototype;
  var oNew = new fNewConstr();
  this.apply(oNew, aArgs);
  return oNew;
};
```

使用示例：

```javascript
function MyConstructor () {
    for (var nProp = 0; nProp < arguments.length; nProp++) {
        this["property" + nProp] = arguments[nProp];
    }
}

var myArray = [4, "Hello world!", false];
var myInstance = MyConstructor.construct(myArray);

console.log(myInstance.property1);                // logs "Hello world!"
console.log(myInstance instanceof MyConstructor); // logs "true"
console.log(myInstance.constructor);              // logs "MyConstructor"
```

!> 这个非native的Function.construct方法无法和一些native构造器（例如Date）一起使用。 在这种情况下你必须使用Function.bind方法（例如，想象有如下一个数组要用在Date构造器中： [2012, 11, 4]；这时你需要这样写： new (Function.prototype.bind.apply(Date, [null].concat([2012, 11, 4])))() – -无论如何这不是最好的实现方式并且也许不该用在任何生产环境中).

## call
<span id="call"></span>


## Reference

<span id="r1"></span>
> [mdn concat](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

<span id="r2"></span>
> [mdn Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)