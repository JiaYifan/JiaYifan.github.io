## 源码

```
isValidElement(result)
  ? cloneElement(
      result,
      result?.props,
      result?.props?.children ?? defaultContent,
    )
  : result,
```

## 报错

```
error   Compile error: 
Failed to compile, check the errors for troubleshooting.
TS2339: Property 'children' does not exist on type '{}'.
    212 |                 result,
    213 |                 result?.props,
  > 214 |                 result?.props?.children ?? defaultContent,
        |                                ^^^^^^^^
    215 |               )
    216 |             : result,
    217 |         );
```

正常来说 result 会被解析成

```
const result: React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
```

props 会被解析成

```
(property) React.ReactElement<P = any, T extends string | React.JSXElementConstructor<any> = string | React.JSXElementConstructor<any>>.props: any
```

但是看报错 props 被解析成了 `{}`

怀疑是 optional chaining 导致类型的变化，去掉果然可以解（前面有 isValidElement 判断，去掉是安全的）

> 但这个报错只会在特定项目出现，怀疑也跟 ts 版本有关
