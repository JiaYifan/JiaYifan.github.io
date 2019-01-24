# Inheritance
转自[https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance](https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Inheritance)

* 继承三部曲：
1. 继承构造器函数
```javascript
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);
  this.subject = subject;
}
```
2. 继承原型
```javascript
Teacher.prototype = Object.create(Person.prototype);
```
3. 重定向构造器
代码，在底下加上这一行代码来解决：
```javascript
Teacher.prototype.constructor = Teacher;
```

* 任何您想要被继承的方法都应该定义在构造函数的`prototype`对象里，并且永远使用父类的`prototype`来创造子类的`prototype`，这样才不会打乱类继承结构。

* `Object.is()`、`Object.keys()`，以及其他不在 `prototype` 对象内的成员，不会被“对象实例”或“继承自 `Object()` 的对象类型”所继承。这些方法/属性仅能被 `Object()` 构造器自身使用。

> [mdn Object.create](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

> TO DO
JavaScript定义对象的私有成员,不能被继承

了解了 OOJS 的大多数细节之后，本文将介绍如何创建“子”对象类别（构造器）并从“父”类别中继承功能。此外，我们还会针对何时何处使用 OOJS 给出建议。

## 原型式的继承
到目前为止我们已经了解了一些关于原型链的实现方式以及成员变量是如何通过它来实现继承，但是之前涉及到的大部分都是浏览器内置函数（比如 `String`、`Date`、`Number` 和 `Array`），那么我们如何创建一个继承自另一对象的JavaScript对象呢？

正如前面课程所提到的，有些人认为JavaScript并不是真正的面向对象语言，在经典的面向对象语言中，您可能倾向于定义类对象,然后您可以简单地定义哪些类继承哪些类，JavaScript使用了另一套实现方式，继承的对象函数并不是通过复制而来，而是通过原型链继承（通常被称为 **原型式继承 —— prototypal inheritance**）。

让我们通过具体的例子来解释上述概念

## 开始
```javascript
function Person(first, last, age, gender, interests) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
};
```
所有的方法都定义在构造器的原型上，比如：

```javascript
Person.prototype.greeting = function() {
  alert('Hi! I\'m ' + this.name.first + '.');
};
```

!> 注意：在源代码中，你可以看到已定义的`bio()`和`farewell()`方法。随后，你将看到它们被其他的构造器所继承。

比如我们想要创建一个`Teacher`类，就像我们前面在面向对象概念解释时用的那个一样。这个类会继承`Person`的所有成员，同时也包括：

1. 一个新的属性，`subject`——这个属性包含了教师教授的学科。
2. 一个被更新的`greeting()`方法，这个方法打招呼听起来比一般的`greeting()`方法更正式一点——对于一个教授一些学生的老师来说。

## 定义 Teacher() 构造器函数
我们要做的第一件事是创建一个`Teacher()`构造器——将下面的代码加入到现有代码之下：

```javascript
function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
}
```

这在很多方面看起来都和`Person`的构造器很像，但是这里有一些我们从没见过的奇怪玩意——`call()`函数。基本上，这个函数允许您调用一个在这个文件里别处定义的函数。第一个参数指明了在您运行这个函数时想对“`this`”指定的值，也就是说，您可以重新指定您调用的函数里所有“`this`”指向的对象。其他的变量指明了所有目标函数运行时接受的参数。

!> 注：在这个例子里我们在创建一个新的对象实例时同时指派了继承的所有属性，但是注意您需要在构造器里将它们作为参数来指派，即使实例不要求它们被作为参数指派（比如也许您在创建对象的时候已经得到了一个设置为任意值的属性）

所以在这个例子里，我们很有效的在`Teacher()`构造函数里运行了`Person()`构造函数（见上文），得到了和在`Teacher()`里定义的一样的属性，但是用的是传送给`Teacher()`，而不是`Person()`的值（我们简单使用这里的`this`作为传给`call()`的`this`，意味着`this`指向`Teacher()`函数）。

在构造器里的最后一行代码简单地定义了一个新的`subject`属性，这将是教师会有的，而一般人没有的属性。

顺便提一下，我们本也可以这么做：

```javascript
function Teacher(first, last, age, gender, interests, subject) {
  this.name = {
    first,
    last
  };
  this.age = age;
  this.gender = gender;
  this.interests = interests;
  this.subject = subject;
}
```

但是这只是重新定义了一遍属性，并不是将他们从Person()中继承过来的，所以这违背了我们的初衷。这样写也会需要更长的代码。

### 从无参构造函数继承
请注意，如果您继承的构造函数不从传入的参数中获取其属性值，则不需要在`call()`中为其指定其他参数。所以，例如，如果您有一些相当简单的东西：

```javascript
function Brick() {
  this.width = 10;
  this.height = 20;
}
```
您可以这样继承`width`和`height`属性（以及下面描述的其他步骤）：

```javascript
function BlueGlassBrick() {
  Brick.call(this);

  this.opacity = 0.5;
  this.color = 'blue';
}
```
请注意，我们仅传入了`this`到`call()`中 - 不需要其他参数，因为我们不会继承通过参数设置的父级的任何属性。

## 设置 `Teacher()` 的原型和构造器引用
到目前为止一切看起来都还行，但是我们遇到问题了。我们已经定义了一个新的构造器，这个构造器默认有一个空的原型属性。我们需要让`Teacher()`从`Person()`的原型对象里继承方法。我们要怎么做呢？

1. 在您先前添加的代码的下面增加以下这一行：
```javascript
Teacher.prototype = Object.create(Person.prototype);
```
这里我们的老朋友`create()`又来帮忙了——在这个例子里我们用这个函数来创建一个和`Person.prototype`一样的新的原型属性值（这个属性指向一个包括属性和方法的对象），然后将其作为`Teacher.prototype`的属性值。这意味着`Teacher.prototype`现在会继承`Person.prototype`的所有属性和方法。

2. 接下来，在我们动工之前，还需要完成一件事 — 现在`Teacher()`的`prototype`的`constructor`属性指向的是`Person()`, 这是由我们生成`Teacher()`的方式决定的。(这篇 [Stack Overflow post](https://stackoverflow.com/questions/8453887/why-is-it-necessary-to-set-the-prototype-constructor) 文章会告诉您详细的原理) — 将您写的页面在浏览器中打开，进入JavaScript控制台，输入以下代码来确认：
`Teacher.prototype.constructor`
3. 这或许会成为很大的问题，所以我们需要将其正确设置——您可以回到源代码，在底下加上这一行代码来解决：
```javascript
Teacher.prototype.constructor = Teacher;
```
4. 当您保存并刷新页面以后，输入`Teacher.prototype.constructor`就会得到`Teacher()`。
!> 注：每一个函数对象（`Function`）都有一个`prototype`属性，并且只有函数对象有`prototype`属性，因为`prototype`本身就是定义在`Function`对象下的属性。当我们输入类似`var person1=new Person(...)`来构造对象时，JavaScript实际上参考的是`Person.prototype`指向的对象来生成`person1`。另一方面，`Person()`函数是`Person.prototype`的构造函数，也就是说`Person===Person.prototype.constructor`（不信的话可以试试）。

在定义新的构造函数`Teacher`时，我们通过`function.call`来调用父类的构造函数，但是这样无法自动指定`Teacher.prototype`的值，这样`Teacher.prototype`就只能包含在构造函数里构造的属性，而没有方法。因此我们利用`Object.create()`方法将`Person.prototype`作为`Teacher.prototype`的原型对象，并改变其构造器指向，使之与`Teacher`关联。

!> 任何您想要被继承的方法都应该定义在构造函数的`prototype`对象里，并且永远使用父类的`prototype`来创造子类的`prototype`，这样才不会打乱类继承结构。

## 向 Teacher() 添加一个新的greeting()函数
为了完善代码，您还需在构造函数`Teacher()`上定义一个新的函数`greeting()`。最简单的方法是在`Teacher`的原型上定义它—把以下代码添加到您代码的底部：
```javascript
Teacher.prototype.greeting = function() {
  var prefix;

  if(this.gender === 'male' || this.gender === 'Male' || this.gender === 'm' || this.gender === 'M') {
    prefix = 'Mr.';
  } else if(this.gender === 'female' || this.gender === 'Female' || this.gender === 'f' || this.gender === 'F') {
    prefix = 'Mrs.';
  } else {
    prefix = 'Mx.';
  }

  alert('Hello. My name is ' + prefix + ' ' + this.name.last + ', and I teach ' + this.subject + '.');
};
```
这样就会出现老师打招呼的弹窗，老师打招呼会使用条件结构判断性别从而使用正确的称呼。

## 范例尝试
现在我们来键入代码，将下面的代码放到您的 JavaScript 代码下面从而来创建一个 `Teacher()` 对象实例。

```javascript
var teacher1 = new Teacher('Dave', 'Griffiths', 31, 'male', ['football', 'cookery'], 'mathematics');
```
当您保存代码并刷新的时候，试一下您的老师实例的属性和方法：
```javascript
teacher1.name.first;
teacher1.interests[0];
teacher1.bio();
teacher1.subject;
teacher1.greeting();
```
前面三个进入到从`Person()`的构造器 继承的属性和方法，后面两个则是只有`Teacher()`的构造器才有的属性和方法。

我们在这里讲述的技巧并不是 JavaScript 中创建继承类的唯一方式，但是这个技巧也还不错，非常好地告诉了您如何在 JavaScript 中实行继承操作。

您可能对在 JavaScript中使用其他方法来实行继承会感兴趣(参见 [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes))。我们没有覆盖那些内容，因为并不是每种浏览器都会支持这些方法。我们在这一系列文章中介绍的所有其他方法都会被 IE9 支持或者更老的浏览器支持，也有一些方法可以支持更老的浏览器。

一个常用的方法是使用 JavaScript 语言库——最热门的一些库提供一些方法让我们更快更好地实行继承。比如 [CoffeeScript](http://coffeescript.org/#classes) 就提供一些类和扩展。

## 对象成员总结
总结一下，您应该基本了解了以下三种属性或者方法：

1. 那些定义在构造器函数中的、用于给予对象实例的。这些都很容易发现 - 在您自己的代码中，它们是构造函数中使用`this.x = x`类型的行；在内置的浏览器代码中，它们是可用于对象实例的成员（通常通过使用`new`关键字调用构造函数来创建，例如`var myInstance = new myConstructor()`）。
2. 那些直接在构造函数上定义、仅在构造函数上可用的。这些通常仅在内置的浏览器对象中可用，并通过被直接链接到构造函数而不是实例来识别。 例如`Object.keys()`。
3. 那些在构造函数原型上定义、由所有实例和对象类继承的。这些包括在构造函数的原型属性上定义的任何成员，如`myConstructor.prototype.x()`。
如果您现在觉得一团浆糊，别担心——您现在还处于学习阶段，不断练习才会慢慢熟悉这些知识。

## 何时在 JavaScript 中使用继承？
特别是在读完这段文章内容之后，您也许会想 "天啊，这实在是太复杂了". 是的，您是对的，原型和继承代表了JavaScript这门语言里最复杂的一些方面，但是JavaScript的强大和灵活性正是来自于它的对象体系和继承方式，这很值得花时间去好好理解下它是如何工作的。

在某种程度上来说，您一直都在使用继承 - 无论您是使用WebAPI的不同特性还是调用字符串、数组等浏览器内置对象的方法和属性的时候，您都在隐式地使用继承。

就在自己代码中使用继承而言，您可能不会使用的非常频繁，特别是在小型项目中或者刚开始学习时 - 因为当您不需要对象和继承的时候，仅仅为了使用而使用它们只是在浪费时间而已。但是随着您的代码量的增大，您会越来越发现它的必要性。如果您开始创建一系列拥有相似特性的对象时，那么创建一个包含所有共有功能的通用对象，然后在更特殊的对象类型中继承这些特性，将会变得更加方便有用。

!> 注: 考虑到JavaScript的工作方式，由于原型链等特性的存在，在不同对象之间功能的共享通常被叫做 委托 - 特殊的对象将功能委托给通用的对象类型完成。这也许比将其称之为继承更为贴切，因为“被继承”了的功能并没有被拷贝到正在“进行继承”的对象中，相反它仍存在于通用的对象中。

在使用继承时，建议您不要使用过多层次的继承，并仔细追踪定义方法和属性的位置。很有可能您的代码会临时修改了浏览器内置对象的原型，但您不应该这么做，除非您有足够充分的理由。过多的继承会在调试代码时给您带来无尽的混乱和痛苦。

总之，对象是另一种形式的代码重用，就像函数和循环一样，有他们特定的角色和优点。如果您发现自己创建了一堆相关的变量和函数，还想一起追踪它们并将其灵活打包的话，对象是个不错的主意。对象在您打算把一个数据集合从一个地方传递到另一个地方的时候非常有用。这些都可以在不使用构造器和继承的情况下完成。如果您只是需要一个单一的对象实例，也许使用对象常量会好些，您当然不需要使用继承。

总结节
这篇文章覆盖了剩余的 OOJS 理论的核心知识和我们认为您应该知道的语法，这个时候您应该理解了 JavaScript 中的对象和 OOP 基础，原型和原型继承机制，如何创建类（constructors）和对象实例，为类增加功能，通过从其他类继承而创建新的子类。
