# 适合初学者的JavaScript面向对象
转自[https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object-oriented_JS](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object-oriented_JS)

* 多态——这个高大上的词正是用来描述多个对象拥有实现共同方法的能力。
* `new`一个`function`时，该`function`作为构造函数，将不同的对象实例保存在**不同的命名空间**里
* JavaScript有个内嵌的方法`create()`, 它允许您基于现有对象创建新的对象实例。

## 构建函数和对象实例节
有些人认为 JavaScript 不是真正的面向对象的语言，比如它没有像许多面向对象的语言一样有用于创建class类的声明。JavaScript 用一种称为**构建函数**的特殊函数来定义对象和它们的特征。构建函数非常有用，因为很多情况下您不知道实际需要多少个对象（实例）。**构建函数**提供了创建您所需对象（实例）的有效方法，将对象的数据和特征函数按需联结至相应对象。

不像“经典”的面向对象的语言，从构建函数创建的新实例的特征并非全盘复制，而是通过一个叫做**原形链**的参考链链接过去的。（参见 [Object prototypes](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes)），所以这并非真正的实例，严格的讲， JavaScript 在对象间使用和其它语言的共享机制不同。

!> 注： “经典”的面向对象的语言并非坏事，就像上面提到的，OOP 可能很快就变得非常复杂，JavaScript 找到了在不变的特别复杂的情况下利用面向对象的优点的方法。

让我们来看看 JavaScript 如何通过构建函数对象实例来创建类。

### 一个简单的例子
1. 让我们看看如何通过一个普通的函数定义一个”人“。在您的文件中添加以下代码:

```javascript
function createNewPerson(name) {
  var obj = {};
  obj.name = name;
  obj.greeting = function () {
    alert('Hi! I\'m ' + this.name + '.');
  }
  return obj;
}
```
2. 您现在可以通过调用这个函数创建一个新的叫 salva 的人，在您浏览器的JavaScript console 试试 ：

```javascript
var salva = createNewPerson('salva');
salva.name;
salva.greeting();
```

3. 上述代码运行良好，但是有点冗长；如果我们知道如何创建一个对象，就没有必要创建一个新的空对象并且返回它。幸好 JavaScript 通过构建函数提供了一个便捷的方法，方法如下：

将之前的代码用如下代码代替：

```javascript
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}
```

这个构建函数是 JavaScript 版本的类。您会发现，它只定义了对象的属性和方法，除了没有明确创建一个对象和返回任何值和之外，它有了您期待的函数所拥有的全部功能。这里使用了`this`关键词，即无论是该对象的哪个实例被这个构建函数创建，它的 `name` 属性就是传递到构建函数形参`name`的值，它的 `greeting()` 方法中也将使用相同的传递到构建函数形参`name`的值。

!> 注： 一个构建函数通常是大写字母开头，这样便于区分构建函数和普通函数。

那如何调用构建函数创建新的实例呢？

1. 将下面的代码加在您之前的代码下面：
```javascript
var person1 = new Person('Bob');
var person2 = new Person('Sarah');
```

2. 保存并刷新浏览器，在 console 里输入如下代码：
```javascript
person1.name
person1.greeting()
person2.name
person2.greeting()
```

酷！您现在看到页面上有两个对象，每一个保存在**不同的命名空间**里，当您访问它们的属性和方法时，您需要使用`person1`或者`person2`来调用它们。尽管它们有着相同的`name`属性和 `greeting()`方法它们是各自独立的，所以相互的功能不会冲突。注意它们使用的是自己的 `name` 值，这也是使用 `this` 关键字的原因，它们使用的从实参传入形参的自己的值，而不是其它的什么值。

再看看这个构造对象的语法：

```javascript
var person1 = new Person('Bob');
var person2 = new Person('Sarah');
```

上述代码中，关键字 `new` 跟着一个含参函数，用于告知浏览器我们想要创建一个对象实例，非常类似函数调用，并把结果保存到变量中。每个示例类都是根据下面的方式定义的。

```javascript
function Person(name) {
  this.name = name;
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name + '.');
  };
}
```

当新的对象被创立, 变量`person1`与`person2`有效地包含了以下值：

```javascript
{
  name : 'Bob',
  greeting : function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}

{
  name : 'Sarah',
  greeting : function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
}
```

之所以说是“有效”， 是因为实际的方法仍然是定义在类里面， 而不是在对象实例里面, 这与我们之前说的字母意义上的对象还是有所不同的。

## 创建我们最终的构造函数
上面的例子仅仅是简单地介绍如何开始。让我们现在开始创建`Person()`构造函数。

移除掉您之前写的所有代码， 用如下构造函数替代 —— 实现原理上，这与我们之前的例子并无二致， 只是变得稍稍复杂了些：

```javascript
function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.bio = function() {
    alert(this.name.first + ' ' + this.name.last + ' is ' + this.age + ' years old. He likes ' + this.interests[0] + ' and ' + this.interests[1] + '.');
  };
  this.greeting = function() {
    alert('Hi! I\'m ' + this.name.first + '.');
  };
};
```
接下来加上这样一行代码， 用来创建它的一个**对象实例**：

```javascript
var person1 = new Person('Bob', 'Smith', 32, 'male', ['music', 'skiing']);
```

这样，您就可以像我们定义第一个对象一样访问它的属性和方法了：

```javascript
person1['age']
person1.interests[1]
person1.bio()
// etc.
```

进一步的练习
首先， 尝试着写几行代码创建您自己的对象， 接着，尝试`getting`与`setting`对象中的成员。

此外， 我们的`bio()`方法里仍有一些问题 —— 尽管您创建的`Person`是女性，或者是些别的性别类型，输出里的代词都总是 "He"。 而且， 纵然您有更多的兴趣列举在interests数组中， bio只会展示您的两个兴趣。 您能想出如何在类型定义（构造函数）中解决这个问题吗？ 您可以按照您喜欢的方式编写构造函数（您可能需要一些条件判断和循环）。 考虑下语句如何根据性别、兴趣列表中兴趣的数目异构。

注：如果您觉得困难， 我们在我们的[GitHub](https://github.com/mdn/learning-area/blob/master/javascript/oojs/introduction/oojs-class-further-exercises.html)仓库里作了回答([查看它的实现](http://mdn.github.io/learning-area/javascript/oojs/introduction/oojs-class-further-exercises.html)) ——但首先请您尝试着自己写出来。

## 创建对象实例的其他方式
到现在为止，我们了解到了两种不同的创建对象实例的方式 —— 声明一个对象的语法， 与使用构造函数(回顾上面)。

这些方法都是很有用的， 但仍有其他的方法 —— 我们希望您能熟悉这些，以免您在Web世界的旅行中碰到它们。

### Object()构造函数
首先, 您能使用`Object()`构造函数来创建一个新对象。 是的， 一般对象都有构造函数，它创建了一个空的对象。

1. 尝试在您浏览器中的Javascript控制台中输入以下代码：
```javascript
var person1 = new Object();
```
2. 这样就在person1变量中存储了一个空对象。然后, 可以根据需要, 使用点或括号表示法向此对象添加属性和方法；试试这个例子：
```javascript
person1.name = 'Chris';
person1['age'] = 38;
person1.greeting = function() {
  alert('Hi! I\'m ' + this.name + '.');
}
```

3. 还可以将对象文本传递给`Object()` 构造函数作为参数， 以便用属性/方法填充它。请尝试以下操作：
```javascript
var person1 = new Object({
  name : 'Chris',
  age : 38,
  greeting : function() {
    alert('Hi! I\'m ' + this.name + '.');
  }
});
```
### 使用`create()`方法

JavaScript有个内嵌的方法`create()`, 它允许您基于现有对象创建新的对象实例。

1. 在 JavaScript 控制台中尝试此操作：
```javascript
var person2 = Object.create(person1);
```

现在尝试这个：
```javascript
person2.name
person2.greeting()
```

您可以看到，`person2`是基于`person1`创建的， 它们具有相同的属性和方法。这非常有用， 因为它允许您创建新的对象实例而无需定义构造函数。缺点是比起构造函数，浏览器在更晚的时候才支持`create()`方法（IE9,  IE8 或甚至以前相比）， 加上一些人认为构造函数让您的代码看上去更整洁 —— 您可以在一个地方创建您的构造函数， 然后根据需要创建实例， 这让您能很清楚地知道它们来自哪里。

但是, 如果您不太担心对旧浏览器的支持， 并且您只需要一个对象的一些副本， 那么创建一个构造函数可能会让您的代码显得过度繁杂。这取决于您的个人爱好。有些人发现`create()`更容易理解和使用。

稍后我们将更详细地探讨`create()` 的效果。

摘要节
这篇文章简单地介绍了一些面向对象原理 —— 这些描述还不够完整， 但它让您知道我们在这里处理什么。此外， 我们已经开始研究 javascript与 "经典 OOP"的关联与区别， 如何使用构造函数实现 javascript 中的类， 以及生成对象实例的不同方法。

在下一篇文章中， 我们将探讨 JavaScript 对象原型。