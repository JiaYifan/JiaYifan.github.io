待匹配文本：
<br><input type="text" id="toMatch" placeholder="请输入待匹配文本"><br>
正则表达式：
<br><input type="text" id="RegExp" placeholder="请输入正则表达式"><br>
<p><input type="checkbox" name="regType" value="Global" id="Global" />全局搜索</p>
<p><input type="checkbox" name="regType" value="UperOrLower" id="UperOrLower" />忽略大小写</p>
<button id="docheck">校验</button><br>

**new RegExp().test()结果：**
<span id="RegExptest"> </span>

**str.match()结果：**
<div id="strMatch"> </div>

<script type="text/javascript">
var btn = document.getElementById("docheck")
var RegExptest = document.getElementById("RegExptest")
var strMatch = document.getElementById("strMatch")
btn.onclick = function() {
    var toMatchStr = document.getElementById("toMatch").value
    var RegExpStr = document.getElementById("RegExp").value
    var useGlobal = document.getElementById("Global").checked
    var UperOrLower = document.getElementById("UperOrLower").checked
    var _RegExp = new RegExp(RegExpStr)
    if (useGlobal) {
        if (UperOrLower) {
            _RegExp = new RegExp(_RegExp,"gi")
        } else {
            _RegExp = new RegExp(_RegExp,"g")
        }
    } else if (UperOrLower) {
        _RegExp = new RegExp(_RegExp,"i")
    }
    RegExptest.innerHTML = _RegExp.test(toMatchStr)
    // arr = toMatchStr.match(RegExpStr);
    arr = toMatchStr.match(_RegExp);
    let arrStr = ''
    arr.forEach(function(value){
        if(arrStr){
            arrStr = `${arrStr}<br>${value}`
        } else {
            arrStr=value
        }
    })
    debugger
    strMatch.innerHTML = arrStr
}

</script>