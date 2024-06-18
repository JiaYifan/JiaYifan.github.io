# 一些随手笔记，不定时整理到其它目录

## 经验-npm发包

### 背景

字节-生服-营销，物料库需要发包到 bnpm，记录一下流程：

### 创造一个包

> 还没研究出来怎么做，待补充

### 如果不是创造者，找其他管理员将自己添加为包的 owner

```
npm owner ls
```

输出用户名+邮箱

```
npm owner add <username> <package_name>
```

### 发包时排除一些文件

例如单测文件，文档站 demo 文件。一般可以用 `.npmignore` 或 `package.json files` 来排除，但是尝试 `.npmignore` 各种姿势没有效果。

以下是 `files` 的办法

```
{
  "files": [
    "dist",
    "!/**/Demo",
    "!/**/__demo__",
    "!/**/Test",
    "!/**/__tests__"
  ]
}
```

### 测试你的 .npmignore 或 package.json files 是否有效

上面配置好以后，不知道有没有效果，不要傻乎乎地一直发包到 npm 上看效果，可以运行下面命令，会在本地生成一个 {包名}{版本号}.tgz，也就是后续上传到 npm 上的压缩包

```
npm pack
```
