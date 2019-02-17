## display
|值|描述|
|---|---|
none|此元素不会被显示。
block|此元素将显示为块级元素，此元素前后会带有换行符。
inline|默认。此元素会被显示为内联元素，元素前后没有换行符。
inline-block|行内块元素（CSS2.1）。别的元素看它是inline，比如和其他行内元素可处于同一行。但自己看自己是块级元素，比如有宽高等属性
inline-flex|内联块级弹性伸缩盒，主要用于：将flex用于块级元素时，想让他具有内联元素特效
list-item|此元素会作为列表显示。
run-in|此元素会根据上下文作为块级元素或内联元素显示。
compact|CSS 中有值 compact，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。
marker|CSS 中有值 marker，不过由于缺乏广泛支持，已经从 CSS2.1 中删除。
table|此元素会作为块级表格来显示（类似 `<table>`），表格前后带有换行符。
inline-table|此元素会作为内联表格来显示（类似 `<table>`），表格前后没有换行符。
table-row-group|此元素会作为一个或多个行的分组来显示（类似 `<tbody>`）。
table-header-group|此元素会作为一个或多个行的分组来显示（类似 `<thead>`）。
table-footer-group|此元素会作为一个或多个行的分组来显示（类似 `<tfoot>`）。
table-row|此元素会作为一个表格行显示（类似 `<tr>`）。
table-column-group|此元素会作为一个或多个列的分组来显示（类似 `<colgroup>`）。
table-column|此元素会作为一个单元格列显示（类似 `<col>`）
table-cell|此元素会作为一个表格单元格显示（类似 `<td>` 和 `<th>`）
table-caption|此元素会作为一个表格标题显示（类似 `<caption>`）
inherit|规定应该从父元素继承 display 属性的值。

HTML（超文本标记语言）中元素大多数都是“块级”元素或行内元素。
* 块级元素占据其父元素（容器）的整个空间，因此创建了一个“块”。
* 一个行内元素只占据它对应标签的边框所包含的空间。

通常浏览器会在块级元素前后另起一个新行。下面的例子表明了块级元素的作用：

> 块级元素示例

**HTML**

```html
<p>This paragraph is a block-level element; its background has been colored to display the paragraph's parent element.</p>
```

**CSS**

```css
p { background-color: #8ABB55; }
```

<p style="background-color: #8ABB55;">This paragraph is a block-level element; its background has been colored to display the paragraph's parent element.</p>

> 行内元素示例
**HTML**

```html
<p>This <span>span</span> is an inline element; its background has been colored to display both the beginning and end of the inline element's influence</p>
```

**CSS**

```css
span { background-color: #8ABB55; }
```

<p>This <span style="background-color: #8ABB55;">span</span> is an inline element; its background has been colored to display both the beginning and end of the inline element's influence</p>

> 用法

* 块级元素只能出现在 <body> 元素内。

!> 块级元素与行内元素有几个关键区别：

|块级元素|行内元素|
|---|---|
独占一行，默认情况下，其宽度自动填满其父元素宽度|相邻的行内元素会排列在同一行里，直到一行排不下，才会换行，其宽度随元素的内容而变化
可以设置`width`，`height`属性|行内元素设置`width`，`height`属性无效
可以设置margin和padding属性|行内元素起边距作用的只有`margin-left`、`margin-right`、`padding-left`、`padding-right`，其它属性不会起边距效果。
对应于`display:block`|对应于`display:inline`；
块级元素可以包含行内元素和其他块级元素|行内元素只能包含数据和其他行内元素。
