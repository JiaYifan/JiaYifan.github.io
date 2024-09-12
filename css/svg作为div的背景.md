拿到 svg 源码，如何将其作为 div 的背景：

1. 上传到 cdn 服务，`background-image: url("http:xxx")`
2. 将 svg 专成 base64，`background-image: url(base64)`

svh 转 base64

> https://juejin.cn/post/6844903802202832903

### 一：了解一下 canvas 转 Base64

```
 const canvas = document.getElementById('myCanvas');
 const ImgBase64 = canvas.toDataURL('image/png');
```

`data:image/png;base64,xxx... 【格式为 xxx.png】`

### 二：了解一下 svg 转 .svg格式的 Base64 图片

```
  const svg = document.getElementById('mySvg');
  const s = new XMLSerializer().serializeToString(svg);
  const ImgBase64 = `data:image/svg+xml;base64,${window.btoa(s)}`;
```

`data:image/svg+xml;base64,xxx... 【格式为 xxx.svg】`

需求到这里就好了。但是还想把 svg 转成 png 的 base64 。

### 三：把【一】【二】糅合一下

把 svg 转成 .svg 格式的 base64
创建一个 图片容器 存放 ①
创建一个 canvas容器 存放 ②
把 ③ 转成 .png 格式的 base64

```
     // ↓ 第一部分
     const svg = document.getElementById('mySvg');
     const s = new XMLSerializer().serializeToString(svg);
     const src = `data:image/svg+xml;base64,${window.btoa(s)}`;
     // ↓ 创建图片容器并存放
     const img = new Image(); // 创建图片容器承载过渡
     img.src = src;
     // 注意：需要在图片onload方法中执行
     img.onload = () => {
       // ↓ 第二部分
       const canvas = document.createElement('canvas');
       canvas.width = img.width;
       canvas.height = img.height;
       const context = canvas.getContext('2d');
       context.drawImage(img, 0, 0);
       const ImgBase64 = canvas.toDataURL('image/png');
     }
```

`data:image/png;base64,xxx... 【格式为 xxx.png】`
