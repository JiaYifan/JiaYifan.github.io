# [JavaScript回调函数](https://www.cnblogs.com/gaosheng-221/p/6045483.html)
> 转自[understand Javascript callback functions and use them](http://javascriptissexy.com/understand-javascript-callback-functions-and-use-them/)

In JavaScript, functions are first-class objects; that is, functions are of the type Object and they can be used in a first-class *manner like* 类似 any other object (String, Array, Number, etc.) since they are in fact objects themselves. They can be “stored in variables, passed as arguments to functions, created within functions, and returned from functions `functions are first-class objects 所以可以被当成对象处理`

Because functions are first-class objects, we can pass a function as an argument in another function and later execute that passed-in function or even return it to be executed later. This is the *essence* 精髓 of using callback functions in JavaScript. In the rest of this article we will learn everything about JavaScript callback functions. Callback functions are probably the most widely used functional programming technique in JavaScript, and you can find them in just about every piece of JavaScript and jQuery code, yet they remain mysterious to many JavaScript developers. The mystery will be no more, by the time you finish reading this article. `自吹`

**Callback functions** are derived from a *programming paradigm* 编程范式 known as *functional programming* 函数式编程. At a fundamental level, functional programming specifies the use of functions as arguments. Functional programming was—and still is, though to a much lesser extent today—seen as an *esoteric* 秘传 technique of specially trained, master programmers. `回调函数就是一种称为函数式编程的编程范式`

Fortunately, the techniques of functional programming have been *elucidated* 阐明 so that *mere mortals* 凡人 like you and me can understand and use them with ease. One of the chief techniques in functional programming happens to be callback functions. As you will read shortly, implementing callback functions is as easy as passing regular variables as arguments. This technique is so simple that I wonder why it is mostly covered in advanced JavaScript topics. `汝等凡人亦可学会`

## What is a Callback or *Higher-order Function* 高阶函数?

A callback function, also known as a higher-order function, is a function that is passed to another function (let’s call this other function “otherFunction”) as a parameter, and the callback function is called (or executed) inside the otherFunction. A callback function is essentially a *pattern* 编程模式 (an established solution to a common problem), and therefore, the use of a callback function is also known as a *callback pattern* 回调模式. `定义：一个回调函数，也被称为高阶函数，是一个被作为参数传递给另一个函数，并在某一时刻被这个函数调用的函数`

Consider this common use of a callback function in jQuery:

```javascript
//Note that the item in the click method's parameter is a function, not a variable.
//The item is a callback function
$("#btn_1").click(function() {
  alert("Btn 1 Clicked");
});
```
As you see in the *preceding* 前面的 example, we pass a function as a parameter to the click method. And the click method will call (or execute) the callback function we passed to it. This example illustrates a typical use of callback functions in JavaScript, and one widely used in jQuery. `将函数作为参数传递给click方法`

*Ruminate on* 认真思考 this other classic example of callback functions in basic JavaScript:

```javascript
var friends = ["Mike", "Stacy", "Andy", "Rick"];

friends.forEach(function (eachName, index){
    console.log(index + 1 + ". " + eachName); // 1. Mike, 2. Stacy, 3. Andy, 4. Rick
});
```

Again, note the way we pass an *anonymous function* 匿名函数 (a function without a name) to the forEach method as a parameter.

So far we have passed anonymous functions as a parameter to other functions or methods. Lets now understand how callbacks work before we look at more *concrete* 具体 examples and start making our own callback functions.

## How Callback Functions Work?

We can pass functions around like variables and return them in functions and use them in other functions. When we pass a callback function as an argument to another function, we are only passing the function definition. We are not executing the function in the parameter. In other words, we aren’t passing the function with the trailing pair of executing parenthesis () like we do when we are executing a function. `仅仅传递了函数定义，并不像执行函数一样带小括号`

And since the *containing function* 包含回调函数的函数 has the callback function in its parameter as a function definition, it can execute the callback anytime.

Note that the callback function is not executed immediately. It is “called back” (*hence the name* 后面都用这个名字) at some specified point inside the containing function’s body. So, even though the first jQuery example looked like this: `回调函数并不会马上被执行`

```javascript
//The anonymous function is not being executed there in the parameter. 
//The item is a callback function
$("#btn_1").click(function() {
  alert("Btn 1 Clicked");
});
```

the anonymous function will be called later inside the function body. Even without a name, it can still be accessed later via the arguments object by the containing function.

### Callback Functions Are *Closures* 闭包

When we pass a callback function as an argument to another function, the callback is executed at some point inside the containing function’s body just as if the callback were defined in the containing function. This means the callback is a closure. Read my post, [Understand JavaScript Closures With Ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/) for more on closures. As we know, closures have access to the containing function’s scope, so the callback function can access the containing functions’ variables, and even the variables from the global scope. `回调函数实际是个闭包，可以访问包裹函数的变量`

## Basic Principles when Implementing Callback Functions

While uncomplicated, callback functions have a few noteworthy principles we should be familiar with when implementing them. `实现回调函数时有几点值得注意的原则`

### Use Named OR Anonymous Functions as Callbacks

In the earlier jQuery and forEach examples, we used anonymous functions that were defined in the parameter of the containing function. That is one of the common patterns for using callback functions. Another popular pattern is to declare a named function and pass the name of that function to the parameter. Consider this: `除了匿名函数外还有将函数名作为参数的方式`
```javascript
// global variable
var allUserData = [];

// generic logStuff function that prints to console
function logStuff (userData) {
    if ( typeof userData === "string")
    {
        console.log(userData);
    }
    else if ( typeof userData === "object")
    {
        for (var item in userData) {
            console.log(item + ": " + userData[item]);
        }

    }

}

// A function that takes two parameters, the last one a callback function
function getInput (options, callback) {
    allUserData.push (options);
    callback (options);

}

// When we call the getInput function, we pass logStuff as a parameter.
// So logStuff will be the function that will called back (or executed) inside the getInput function
getInput ({name:"Rich", speciality:"JavaScript"}, logStuff);
//  name: Rich
// speciality: JavaScript
```

### Pass Parameters to Callback Functions

Since the callback function is just a normal function when it is executed, we can pass parameters to it. We can pass any of the containing function’s properties (or global properties) as parameters to the callback function. In the preceding example, we pass options as a parameter to the callback function. Let’s pass a global variable and a local variable: `可以给回调函数传入局部变量或全局变量`

```javascript
//Global variable
var generalLastName = "Clinton";

function getInput (options, callback) {
    allUserData.push (options);
// Pass the global variable generalLastName to the callback function
    callback (generalLastName, options);
}
```

### Make Sure Callback is a Function Before Executing It

It is always wise to check that the callback function passed in the parameter is indeed a function before calling it. Also, it is good practice to make the callback function optional. `最好要检查下写在参数里的回调函数的确是个function，当然也可以让回调函数作为可选的`

Let’s *refactor* 重构 the getInput function from the previous example to ensure these checks are in place.

```javascript
function getInput(options, callback) {
    allUserData.push(options);

    // Make sure the callback is a function
    if (typeof callback === "function") {
    // Call it, since we have confirmed it is callable
        callback(options);
    }
}
```

Without the check in place, if the getInput function is called either without the callback function as a parameter or in place of a function a non-function is passed, our code will result in a runtime error. `否则会出现runtime error`

### Problem When Using Methods With The *this Object* this对象 as Callbacks

When the callback function is a method that uses the `this` object, we have to modify how we execute the callback function to preserve the this object context. Or else the this object will either point to the global window object (in the browser), if callback was passed to a global function. Or it will point to the object of the containing method. `回调函数中用到this时，要注意this的指向`
Let’s explore this in code:

```javascript
// Define an object with some properties and a method
// We will later pass the method as a callback function to another function
var clientData = {
    id: 094545,
    fullName: "Not Set",
    // setUserName is a method on the clientData object
    setUserName: function (firstName, lastName)  {
        // this refers to the fullName property in this object
      this.fullName = firstName + " " + lastName;
    }
}

function getUserInput(firstName, lastName, callback)  {
    // Do other stuff to validate firstName/lastName here

    // Now save the names
    callback (firstName, lastName);
}
```

In the following code example, when clientData.setUserName is executed, this.fullName will not set the fullName property on the clientData object. Instead, it will set fullName on the window object, since getUserInput is a global function. This happens because the `this` object in the global function points to the window object. `此时clientData.setUserName方法的this指向window，而非clientData`

```javascript
getUserInput ("Barack", "Obama", clientData.setUserName);

console.log (clientData.fullName);// Not Set

// The fullName property was initialized on the window object
console.log (window.fullName); // Barack Obama
```

### Use the Call or Apply Function To *Preserve* 保存 *this*

We can fix the preceding problem by using the `Call` or `Apply` function (we will discuss these in a full blog post later). For now, know that every function in JavaScript has two methods: Call and Apply. And these methods are used to set the `this` object inside the function and to pass arguments to the functions. `可使用Call和Apply来解决上述问题`

**Call** takes the value to be used as the `this` object inside the function as the first parameter, and the remaining arguments to be passed to the function are passed individually (separated by commas of course). The **Apply** function’s first parameter is also the value to be used as the `this` object inside the function, while the last parameter is an array of values (or the arguments object) to pass to the function. `介绍apply和call，[参见](/JS/apply和call.md)`

This sounds complex, but lets see how easy it is to use Apply or Call. To fix the problem in the previous example, we will use the Apply function thus: `怎么用呢`

```javascript
//Note that we have added an extra parameter for the callback object, called "callbackObj"
function getUserInput(firstName, lastName, callback, callbackObj)  {
    // Do other stuff to validate name here

    // The use of the Apply function below will set the this object to be callbackObj
    callback.apply (callbackObj, [firstName, lastName]);
}
```
With the `Apply` function setting the `this` object correctly, we can now correctly execute the callback and have it set the fullName property correctly on the clientData object: `使用callback.apply就可以啦`

```javascript
// We pass the clientData.setUserName method and the clientData object as parameters. The clientData object will be used by the Apply function to set the this object
getUserInput ("Barack", "Obama", clientData.setUserName, clientData);

// the fullName property on the clientData was correctly set
console.log (clientData.fullName); // Barack Obama
```
We would have also used the `Call` function, but in this case we used the `Apply` function.

### Multiple Callback Functions Allowed

We can pass more than one callback functions into the parameter of a function, just like we can pass more than one variable. Here is a classic example with jQuery’s AJAX function: `可以传入多个回调函数，如AJAX`

```javascript
function successCallback() {
    // Do stuff if success message received
}

function completeCallback() {
    // Do stuff upon completion
}

function errorCallback() {
    // Do stuff if error received
}

$.ajax({
    url:"http://fiddle.jshell.net/favicon.png",
    success:successCallback,
    complete:completeCallback,
    error:errorCallback
});
```

!> “Callback Hell” Problem And Solution

In *asynchronous* 异步的 code execution, which is simply execution of code in any order, sometimes it is common to have numerous levels of callback functions to the extent that you have code that looks like the following. The messy code below is called callback hell because of the difficulty of following the code due to the many callbacks. I took this example from the node-mongodb-native, a MongoDB driver for Node.js. [2]. The example code below is just for demonstration: `回调地狱，看到怀疑人生`

```javascript
var p_client = new Db('integration_tests_20', new Server("127.0.0.1", 27017, {}), {'pk':CustomPKFactory});
p_client.open(function(err, p_client) {
    p_client.dropDatabase(function(err, done) {
        p_client.createCollection('test_custom_key', function(err, collection) {
            collection.insert({'a':1}, function(err, docs) {
                collection.find({'_id':new ObjectID("aaaaaaaaaaaa")}, function(err, cursor) {
                    cursor.toArray(function(err, items) {
                        test.assertEquals(1, items.length);

                        // Let's close the db
                        p_client.close();
                    });
                });
            });
        });
    });
});
```
You are not likely to encounter this problem often in your code, but when you do—and you will from time to time—here are two solutions to this problem. [3] `如何避免`

1. Name your functions and declare them and pass just the name of the function as the callback, instead of defining an anonymous function in the parameter of the main function. `传入函数名而不是直接写一个匿名函数`

2. *Modularity* 模块 : Separate your code into modules, so you can export a section of code that does a particular job. Then you can import that module into your larger application. `代码模块化`

3. 这篇文章应该有些年头了，其实ES6后，常用`.then`来避免

## Make Your Own Callback Functions

Now that you completely (I think you do; if not it is a quick reread :)) understand everything about JavaScript callback functions and you have seen that using callback functions are rather simple yet powerful, you should look at your own code for opportunities to use callback functions, for they will allow you to: `动手做吧blablabla`

* Do not repeat code (DRY—Do Not Repeat Yourself)
* Implement better abstraction where you can have more *generic* 一般的 functions that are *versatile* 通用的 (can handle all sorts of *functionalities* 功能)
* Have better *maintainability* 可维护性
* Have more readable code
* Have more specialized functions.
* 加一条，`.then`虽然可以避免匿名函数不会出现回调地狱，但是最好还是定义函数并传入函数名，复用性和可读性强一些。

It is rather easy to make your own callback functions. In the following example, I could have created one function to do all the work: retrieve the user data, create a generic *poem* 诗 with the data, and greet the user. This would have been a messy function with much if/else statements and, even still, it would have been very limited and incapable of carrying out other functionalities the application might need with the user data. `作者要做个写诗机器人`

Instead, I left the implementation for added functionality up to the callback functions, so that the main function that retrieves the user data can perform virtually any task with the user data by simply passing the user’s full name and gender as parameters to the callback function and then executing the callback function. `将回调函数写在主函数中，这样就能将其作为通用函数，万一未来要改成写歌啥的，主函数不用变`

In short, the getUserInput function is versatile: it can execute all sorts of callback functions with myriad of functionalities. `主函数就是 getUserInput`

```javascript
// First, setup the generic poem creator function; it will be the callback function in the getUserInput function below.
function genericPoemMaker(name, gender) {
    console.log(name + " is finer than fine wine.");
    console.log("Altruistic and noble for the modern time.");
    console.log("Always admirably adorned with the latest style.");
    console.log("A " + gender + " of unfortunate tragedies who still manages a perpetual smile");
}

//The callback, which is the last item in the parameter, will be our genericPoemMaker function we defined above.
function getUserInput(firstName, lastName, gender, callback) {
    var fullName = firstName + " " + lastName;

    // Make sure the callback is a function
    if (typeof callback === "function") {
    // Execute the callback function and pass the parameters to it
    callback(fullName, gender);
    }
}
```
Call the getUserInput function and pass the genericPoemMaker function as a callback:

```javascript
getUserInput("Michael", "Fassbender", "Man", genericPoemMaker);
// Output
/* Michael Fassbender is finer than fine wine.
Altruistic and noble for the modern time.
Always admirably adorned with the latest style.
A Man of unfortunate tragedies who still manages a perpetual smile.
*/
```
Because the getUserInput function is only handling the retrieving of data, we can pass any callback to it. For example, we can pass a greetUser function like this: `回调函数改为问好`

```javascript
function greetUser(customerName, sex)  {
   var salutation  = sex && sex === "Man" ? "Mr." : "Ms.";
  console.log("Hello, " + salutation + " " + customerName);
}

// Pass the greetUser function as a callback to getUserInput
getUserInput("Bill", "Gates", "Man", greetUser);

// And this is the output
Hello, Mr. Bill Gates
```

We called the same getUserInput function as we did before, but this time it performed a completely different task.

As you see, callback functions afford much versatility. And even though the preceding example is relatively simple, imagine how much work you can save yourself and how well abstracted your code will be if you start using callback functions. Go for it. Do it in the monings; do it in the evenings; do it when you are down; do it when you are k

Note the following ways we frequently use callback functions in JavaScript, especially in modern web application development, in libraries, and in frameworks: `以下列举了回调函数常用场景`

* For asynchronous execution (such as reading files, and making HTTP requests) `异步调用（例如读取文件，进行HTTP请求，等等）`
* In Event Listeners/Handlers `时间监听器/处理器`
* In setTimeout and setInterval methods `setTimeout和setInterval方法` PS `现在又有个requestAnimationFrame`
* For Generalization: code conciseness `一般情况：精简代码` PS `现在基本都用promis then了`

# Final Words

JavaScript callback functions are wonderful and powerful to use and they provide great benefits to your web applications and code. You should use them when the need arises; look for ways to refactor your code for Abstraction, Maintainability, and Readability with callback functions.

See you next time, and remember to keep coming back because JavaScriptIsSexy.com has much to teach you and you have much to learn.

# Notes
1. [http://c2.com/cgi/wiki?FirstClass](http://c2.com/cgi/wiki?FirstClass)
2. [https://github.com/mongodb/node-mongodb-native](https://github.com/mongodb/node-mongodb-native)
- [http://callbackhell.com/](http://callbackhell.com/)

- JavaScript Patterns by Stoyan Stefanov (Sep 28, 2010)