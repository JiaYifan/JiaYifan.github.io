# 在 react 里如何使用

```
import Editor from '@monaco-editor/react';
export default () => {
  return <Editor
    value={code} // 受控
    onChange={setCode}
    onMount={handleEditorDidMount} // 可以拿到实例
   />
}
```

# 格式化

一般来说，右键格式化即可，如果想自动格式化

```
import Editor, { Monaco } from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

function handleEditorDidMount(
    editor: monaco.editor.IStandaloneCodeEditor,
    monaco: Monaco,
  ) {
    editor.getAction('editor.action.formatDocument')?.run();
}
```

但如果设置了只读模式 

```
editor.updateOptions({
  readOnly: true,
});
```

这样不会生效，可以先格式化，当 code 变化时（通过 onChange 触发）再设置为 readOnly

```
const [code, setCode] = useState<string>();
const codeHasFormatted = useRef(false);
useEffect(() => {
  if (codeHasFormatted.current) {
    editorRef.current?.updateOptions({
      readOnly: true,
    });
  }
  codeHasFormatted.current = true;
}, [code]);

return (
  <div>
    <Editor
      defaultLanguage="javascript"
      defaultValue={`
const a = {
x: <Test>{{ x: 1 }}</Test>,
y: 2,
z: { a: 1 },
}`}
      // value={code}
      onChange={setCode}
      onMount={handleEditorDidMount}
    />
  </div>
```
