概述节
一个document 的 Document.readyState 属性描述了文档的加载状态。

值节
一个文档的 readyState 可以是以下之一：

loading / 加载
document 仍在加载。
interactive / 互动
文档已经完成加载，文档已被解析，但是诸如图像，样式表和框架之类的子资源仍在加载。
complete / 完成
T文档和所有子资源已完成加载。状态表示 load 事件即将被触发。
当这个属性的值变化时，document 对象上的readystatechange 事件将被触发。

 

语法 节
let string = document.readyState;

// "complete"
例子节
不同的准备状态

switch (document.readyState) {
  case "loading":
    // The document is still loading.
    break;
  case "interactive":
    // The document has finished loading.
    // We can now access the DOM elements.
    var span = document.createElement("span");
    span.textContent = "A <span> element.";
    document.body.appendChild(span);
    break;
  case "complete":
    // The page is fully loaded.
    let CSS_rule = document.styleSheets[0].cssRules[0].cssText;
    console.log(`The first CSS rule is: ${CSS_rule }`);
    break;
}
// 模拟 DOMContentLoaded/ jquery ready
document.onreadystatechange = function () {
  if (document.readyState === "interactive") {
    initApplication();
  }
}
// 模拟 load/onload 事件
document.onreadystatechange = function () {
  if (document.readyState === "complete") {
    initApplication();
  }
}
