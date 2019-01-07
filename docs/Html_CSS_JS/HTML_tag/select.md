# select

## 创建带有 3 个选项的选择列表：

```html
<select id="city">
  <option value ="Wuhu">北京</option>
  <option value ="Tianjin">天津</option>
  <option value="Shanghai">上海</option>
</select>
```
## H5新特性
|属性|值|描述|
|---|---|---|
|autofocus|autofocus|规定在页面加载后文本区域自动获得焦点。|
|disabled|disabled|规定禁用该下拉列表。|
|form|form_id|规定文本区域所属的一个或多个表单。|
|multiple|multiple|规定可选择多个选项。|
|name|name|规定下拉列表的名称。|
|required|required|规定文本区域是必填的。|
|size|number|规定下拉列表中可见选项的数目。|

## Select 对象
在 HTML 表单中，`<select> `标签每出现一次，一个 Select 对象就会被创建。
您可通过遍历表单的 elements[] 数组来访问某个 Select 对象，或者使用 document.getElementById()。
详见[http://www.w3school.com.cn/jsref/dom_obj_select.asp](http://www.w3school.com.cn/jsref/dom_obj_select.asp)

### 基本操作

### 添加选项两种方法(貌似Select对象和Option对象都有add()方法)：
1、new个Option再add进去
```javascript
var cityObj = document.getElementById("city");
cityObj.options.add(new Option('重庆','chongqing'));
// <option value="Huangshan">黄山</option>
```
2、创建option元素，并使用select的add方法
```javascript
var y=document.createElement('option');
y.text='Kiwi'
var x=document.getElementById("mySelect");
try{
    x.add(y,null); // standards compliant
}
catch(ex){
    x.add(y); // IE only
}
```
### 对选项的操作
options[] 集合并非一个普通的 HTMLcollection。为了和早期的浏览器向后兼容，这个集合有某种特殊的行为：允许通过 Select 对象来改变显示的选项：
* 如果把 options.length 属性设置为 0,Select 对象中所有选项都会被清除。
* 如果 options.length 属性的值比当前值小，出现在数组尾部的元素就会被丢弃。
* 如果把 options[] 数组中的一个元素设置为 null，那么选项就会从 Select 对象中删除。
* 可以通过构造函数 Option() 来创建一个新的 option 对象（需要设置 options.length 属性）。
```javascript
cityObj.options.length = 0;
cityObj.options[0]=null; // 下标从0开始
new Option('重庆','chongqing');
```
