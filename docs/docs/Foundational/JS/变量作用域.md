# 变量作用域
转自[JavaScript Variable Scope and Hoisting Explained](http://javascriptissexy.com/javascript-variable-scope-and-hoisting-explained/)

In this post, we will learn JavaScript’s variable scope and hoisting and all the idiosyncrasies of both. `本文讲述了变量作用域、变量升级，以及两者的特效`

We must understand how variable scope and variable hoisting work in JavaScript, if want to understand JavaScript well. These concepts may seem *straightforward* 简单的; they are not. Some important *subtleties* 精妙之处 exist that we must understand, if we want to *thrive* 成长 and *excel* 擅长 as JavaScript developers. `日常忽悠人`

## Variable Scope

A variable’s scope is the context in which the variable exists. The scope specifies from where you can access a variable and whether you have access to the variable in that context. `定义：变量的作用域是变量存在的上下文`

Variables have either a local scope or a global scope. `分为局部作用域、全局作用域`

## Local Variables (Function-level scope)

Unlike most programming languages, JavaScript does not have block-level scope (*variables scoped to surrounding curly brackets* 变量的作用域是大括号); instead, JavaScript has function-level scope. Variables declared within a function are local variables and are only accessible within that function or by functions inside that function. See my post on Closures for more on accessing variables in outer functions from inner functions. `和其他以括号来区分作用域的语言不同，JavaScript有的是函数级别的作用域，函数里的是局部变量`

Demonstration of Function-Level Scope

```javascript
var name = "Richard";

function showName () {
	var name = "Jack"; // local variable; only accessible in this showName function
	console.log (name); // Jack
}
console.log (name); // Richard: the global variable
```

No Block-Level Scope

```javascript
var name = "Richard";
// the blocks in this if statement do not create a local context for the name variable
if (name) {
	name = "Jack"; // this name is the global name variable and it is being changed to "Jack" here
	console.log (name); // Jack: still the global variable
}

// Here, the name variable is the same global name variable, but it was changed in the if statement
console.log (name); // Jack
```

* If You Don’t Declare Your Local Variables, Trouble is Nigh

Always declare your local variables before you use them. In fact, you should use [JSHint](http://www.jshint.com/) to check your code for syntax errors and style guides. Here is the trouble with not declaring local variables:

```javascript
// If you don't declare your local variables with the var keyword, they are part of the global scope
var name = "Michael Jackson";

function showCelebrityName () {
	console.log (name);
}

function showOrdinaryPersonName () {	
	name = "Johnny Evers";
	console.log (name);
}
showCelebrityName (); // Michael Jackson

// name is not a local variable, it simply changes the global name variable
showOrdinaryPersonName (); // Johnny Evers

// The global variable is now Johnny Evers, not the celebrity name anymore
showCelebrityName (); // Johnny Evers

// The solution is to declare your local variable with the var keyword
function showOrdinaryPersonName () {	
	var name = "Johnny Evers"; // Now name is always a local variable and it will not overwrite the global variable
	console.log (name);
}
```

* Local Variables Have *Priority* 优先权 Over Global Variables in Functions

If you declare a global variable and a local variable with the same name, the local variable will have priority when you attempt to use the variable inside a function (local scope): `局部变量优先权较高`

```javascript
var name = "Paul";

function users () {
	// Here, the name variable is local and it takes precedence over the same name variable in the global scope
var name = "Jack";

// The search for name starts right here inside the function before it attempts to look outside the function in the global scope
console.log (name); 
}

users (); // Jack
```

## Global Variables

All variables declared outside a function are in the global scope. In the browser, which is what we are concerned with as front-end developers, the global context or scope is the window object (or the entire HTML document). `全局变量的作用域是整个window对象（会挂在window对象上）或整个HTML文档`

* Any variable declared or initialized outside a function is a global variable, and it is therefore available to the entire application. For example:

```javascript
// To declare a global variable, you could do any of the following:
var myName = "Richard";

// or even
firstName = "Richard";

// or 
var name; //
name;
</pre>

It is important to note that all global variables are attached to the window object. So, all the global variables we just declared can be accessed on the window object like this:
console.log(window.myName); // Richard;

 // or
console.log("myName" in window); // true
console.log("firstName" in window); // true
</pre>
```

* If a variable is initialized (assigned a value) without first being declared with the var keyword, it is automatically added to the global context and it is thus a global variable: `如果变量初始化（赋值）之前没有申明，会自动变成全局变量`

```javascript
function showAge () {
	// Age is a global variable because it was not declared with the var keyword inside this function
	age = 90;
	console.log(age);// 
}

showAge (); // 90

// Age is in the global context, so it is available here, too
console.log(age); // 90
```

Demonstration of variables that are in the Global scope even as they seem otherwise: `JavaScript没有按{}划分作用域，所以下面的例子中{}中的还是全局变量`

```javascript
// Both firstName variables are in the global scope, even though the second one is surrounded by a block {}. 
var firstName = "Richard";
{
var firstName = "Bob";
}

// To reiterate: JavaScript does not have block-level scope

// The second declaration of firstName simply re-declares and overwrites the first one
console.log (firstName); // Bob
```

Another example `for循环不是function，所以i也是全局变量` PS `用let可以避免`

```javascript
for (var i = 1; i <= 10; i++) {
  console.log (i); // outputs 1, 2, 3, 4, 5, 6, 7, 8, 9, 10;
};

// The variable i is a global variable and it is accessible in the following function with the last value it was assigned above 
function aNumber () {
  console.log(i);
}

// The variable i in the aNumber function below is the global variable i that was changed in the for loop above. Its last value was 11, set just before the for loop exited:
aNumber ();  // 11
```
* setTimeout Variables are Executed in the Global Scope
Note that all functions in setTimeout are executed in the global scope. *This is a tricky bit* 这有点棘手; consider this: `setTimeout有个特点，他是在全局变量作用域执行的，他的this指向window` PS `而在function里的this，对于直接调用function来说，不管function被放在了什么地方，this一定是 window，所以在function里的setTimeout最好直接用function的局部变量`

```javascript
 // The use of the "this" object inside the setTimeout function refers to the Window object, not to myObj

var highValue = 200;
var constantVal = 2;
var myObj = {
	highValue: 20,
	constantVal: 5,
	calculateIt: function () {
      setTimeout (function  () {
      	console.log(this.constantVal * this.highValue);
      }, 2000);
	}
}

// The "this" object in the setTimeout function used the global highValue and constantVal variables, because the reference to "this" in the setTimeout function refers to the global window object, not to the myObj object as we might expect.

myObj.calculateIt(); // 400
// This is an important point to remember.
```
> 还有种情况是在for循环里的setTimeout [》》》](docs/Reading_Notes/掘金-前端面试之道.md#setTimeout)

* Do not *Pollute* 污染 the Global Scope

If you want to become a JavaScript master, which you certainly want to do, you have to know that it is important to avoid creating many variables in the global scope, such as this: `不要污染全局变量`

```javascript
// These two variables are in the global scope and they shouldn't be here
var firstName, lastName;

function fullName () {
	console.log ("Full Name: " + firstName + " " + lastName );
}
```

This is the improved code and the proper way to avoid polluting the global scope

```javascript
// Declare the variables inside the function where they are local variables

function fullName () {
	var firstName = "Michael", lastName = "Jackson";

	console.log ("Full Name: " + firstName + " " + lastName );
}
```

In this last example, the function fullName is also in the global scope.

## Variable Hoisting

All variable declarations are hoisted (lifted and declared) to the top of the function, if defined in a function, or the top of the global context, if outside a function. `变量提升就是：函数中的变量会提升至函数顶部；函数外的变量会提升到全局上下文的顶部`

It is important to know that only variable declarations are hoisted to the top, not variable initialization or assignments (when the variable is assigned a value). `值得注意的是，只有变量的声明被提升了，变量的初始化和赋值都没有提升`

Variable Hoisting Example:

```javascript
function showName () {
console.log ("First Name: " + name);
var name = "Ford";
console.log ("Last Name: " + name);
}

showName (); 
// First Name: undefined
// Last Name: Ford

// The reason undefined prints first is because the local variable name was hoisted to the top of the function
// Which means it is this local variable that get calls the first time.
// This is how the code is actually processed by the JavaScript engine:

function showName () {
	var name; // name is hoisted (note that is undefined at this point, since the assignment happens below)
console.log ("First Name: " + name); // First Name: undefined

name = "Ford"; // name is assigned a value

// now name is Ford
console.log ("Last Name: " + name); // Last Name: Ford
}
```

* Function Declaration Overrides Variable Declaration When Hoisted

Both function declaration and variable declarations are hoisted to the top of the containing scope. And function declaration takes *precedence* 优先 over variable declarations (but not over variable assignment). As is noted above, variable assignment is not hoisted, and neither is function assignment. As a reminder, this is a function assignment: var myFunction = function () {}.
Here is a basic example to demonstrate:

```javascript
 // Both the variable and the function are named myName
var myName;

// The function declaration below overrides the variable name
console.log(typeof myName); // function

function myName () {
console.log ("Rich");
}
```
↓`the variable assignment overrides the function declaration`↓
```javascript
 // But in this example, the variable assignment overrides the function declaration
var myName = "Richard"; // This is the variable assignment (initialization) that overrides the function declaration.

function myName () {
console.log ("Rich");
}

console.log(typeof myName); // string 
```
It is important to note that function expressions, such as the example below, are not hoisted. `写成下面这种形式就不会被提升了` OS `有什么卵用？`

```javascript
var myName = "Richard";
console.log(typeof myName); // string 
var myName = function () {
console.log ("Rich");
} 
```
In strict mode, an error will occur if you assign a variable a value without first declaring the variable. Always declare your variables. `在严格模式下，如果赋值前不声明，会报错`

Be good. Sleep well. And enjoy coding.